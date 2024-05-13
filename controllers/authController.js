const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const profile = require("../models/profile");

// Registration endpoint
exports.register = async (req, res) => {
  try {
      const { username, password, email, role } = req.body;
      const image = req.image;
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
        return res.status(400).json({ error: "Username or email already exists" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }


      const hashedPassword = await bcrypt.hash(password, 8);

      const user = new User({
        username,
        password: hashedPassword,
        email,
        role,
        image,
      });
      await user.save();
     res.status(201).json(user);
  } catch (err) {
      res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Login endpoint
exports.login = async (req, res) => {
  const { username, password} = req.body;
  try {
    const user = await User.findOne({ username }).populate('profile');
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      category: user.category,
      profilePic: user.profilePic,
      profile: user.profile
    };

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "3h",
    });

    // Send the user without the password in the response
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
