const mongoose = require("mongoose")
;
const userShema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    lowercase: true,
    trim: true,
    unique: true,
  },
  
  role:{
    type :String ,
    enum:[ 'user', 'serviceProvider'],
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  image:{
    type: String,
  },
  profile: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile', 
  },
});


module.exports = mongoose.model("User", userShema);