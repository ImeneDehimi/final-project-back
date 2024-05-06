const User = require("../models/user");



// get a user
exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("profile");
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  

//   get all users
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate("profile");
      res.json(users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

//   update user
  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profilepic: req.body.profilepic
      }).populate('profile');
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

//   delete user
  exports.deletUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id).populate('profile');
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  