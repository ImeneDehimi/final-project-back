const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["electrician", "plumber", "painter", "builder"],
    required: true,
  },
  businesshrs: [
    {
      day: {
        type: Array,
      },
      startingHour: {
        type: String,
      },
      endingHour: {
        type: String,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  images: { type: Array },

  wilaya: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
  },
  comments: [{ 
    rating:Number,
    text: String ,
    postedBy :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  }],
});

module.exports = mongoose.model("Profile", profileSchema);
