const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const password = require('./model/dbmodel.js');
const cors = require('cors')



app.use(express.json());
app.use(cors())
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('MongoDB connection error:', err));



app.post('/save', async (req, res) => {
    try {
        const newpassword = new password({
            id: req.body.id,
            site: req.body.site,
            username: req.body.username,
            password: req.body.password
        });
        await newpassword.save();
        res.json({ message: "saved", data: newpassword });
    } catch (e) {
        console.error("Error saving password:", e);
        res.status(500).json({ error: "Failed to save password" });
    }
});




app.post('/save', async (req, res) => {
    try {
        console.log(req.body)
        const newpassword = new password({
            id: req.body.id,
            site: req.body.site,
            username: req.body.username,
            password: req.body.password
        })
        await newpassword.save()
        res.json({ message: "saved", data: newpassword });
    }
    catch (e) {
        console.log("error", e)
    }
})

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


