const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const password = require('./model/dbmodel.js');
const corse = require('cors')

app.use(express.json());
app.use(corse())
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('MongoDB connection error:', err));



app.get('/', async (req, res) => {
    try {
        const passwords = await password.find();
        res.json(passwords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



app.post('/save', async (req, res) => {
    try {
        console.log(req.body)
        const newpassword = new password(req.body)
        await newpassword.save()
        res.send("saved")
    }
    catch (e) {
        console.log("error", e)
    }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await password.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Password not found' });
    res.json({ message: 'Password deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


const port = process.env.PORT

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})


