const mongoose = require("mongoose");
const { array } = require("../config/multer");

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
  comments: [{ type: String }],
});

module.exports = mongoose.model("Profile", profileSchema);
