const Profile = require("../models/profile");

// create a profile
exports.createProfile = async(req, res) => {
  const {businesshrs, description, user, wilaya,category} = req.body
    try {
      const profile = new Profile({
        businesshrs, description, user,wilaya,category
      });
      await profile.save();
      res.status(201).json(profile);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };
  
  // Get all profiles
  exports.getAllProfiles = async(req, res) => {
    try {
      const profiles = await Profile.find().populate('user');
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get a specific post
  exports.getProfileById = async(req, res) => {
    try {
      const profile = await Profile.findById(req.params.id).populate({ path: 'user', strictPopulate: false });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// find profile by category
exports.getProfileByCategory = async(req, res) => {
  const category = req.params.category;

  try {
    // Query the database for profiles with the specified category
    const profiles = await Profile.find({ category: category }).populate('user');

    // Check if profiles were found
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found for this category' });
    }

    // Return the found profiles
    res.json(profiles);
  } catch (error) {
    console.error('Error finding profiles by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  // Update a profile
  exports.updateProfile= async (req, res) => {
    try {
      const { businesshrs, description, wilaya,category} = req.body;
      const images = req.imageURLs;
      console.log(images);
      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        { businesshrs, description, wilaya, category,images},
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(updatedProfile);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete a profile
  exports.deleteProfile = async (req, res) => {
    try {
      const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
      if (!deletedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json({ message: "Profile deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


