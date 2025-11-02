const express = require('express')
const app = express()
const password = require('./model/dbmodel.js');
const user = require('./model/user.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));



app.post("/sigh-in", (req, res) => {
    const { email, password } = req.body

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const newuser = await new user({
                email: email,
                password: hash
            })
            await newuser.save()
        });

        const token = jwt.sign({ email: email }, "secret key")
        res.cookie("Token", token)
        res.send("done")
    });


})


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    let User = await user.findOne({ email: email })
    if (!email) return res.send("Somthing went wrong ")


    bcrypt.compare(password, User.password, function (err, result) {
        if (result) {
            const token = jwt.sign({ email: User.email }, "secret key")
            res.cookie("Token", token)
            res.send("Yes you can login ")

        }
        else {
            res.send("No you cant login somthing wend wrong")
        }
    });
})

app.get("/log-out", (req, res) => {
    res.clearCookie("Token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.json({ message: "Logged out successfully" });
})

app.get('/', async (req, res) => {
    try {
        const passwords = await password.find();
        res.status(200).json(passwords);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching passwords', error: err.message });
    }
});



app.post('/save', async (req, res) => {
    const userdata = req.body
    try {
        const newpassword = new password({
            id: userdata.id,
            site: userdata.site,
            username: userdata.username,
            password: userdata.password
        });
        await newpassword.save();
        res.json({ message: "saved", data: newpassword });
    }

    catch (e) {
        console.error("Error saving password:", e);
        res.status(500).json({ error: "Failed to save password" });
    }

});



app.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedPassword = await password.findOneAndUpdate(
            { id },
            updatedData,
            { new: true }
        );

        if (!updatedPassword) {
            return res.status(404).json({ message: "Password not found" });
        }

        res.json({ message: "Password updated successfully", updatedPassword });
    } catch (err) {
        console.error("Edit route error:", err);
        res.status(500).json({ error: "Server error" });
    }
});



app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Trying to delete id:", id);

        const deleted = await password.findOneAndDelete({ id });
        if (!deleted) {
            console.log("Password not found");
            return res.status(404).json({ message: 'Password not found' });
        }

        res.json({ message: 'Password deleted successfully', deleted });
    } catch (err) {
        console.error("Delete route error:", err);
        res.status(500).json({ error: 'Server error' });
    }
});



const port = process.env.PORT

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


