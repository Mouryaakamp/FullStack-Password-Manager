const mongoose = require('mongoose'); 
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('MongoDB connection error:', err));


const PasswordSchema = new mongoose.Schema({
  id:{type:String,required:true},
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Password', PasswordSchema);