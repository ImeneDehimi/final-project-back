const Profile = require("../models/profile");
const User = require("../models/user");

// create a profile
exports.createProfile = async (req, res) => {
  const { businesshrs, description, user, wilaya, category } = req.body;
  try {
    const profile = new Profile({
      businesshrs,
      description,
      user,
      wilaya,
      category,
    });
    await profile.save();
    const updatedUser = await User.findByIdAndUpdate(
      user,
      { profile: profile },
      { new: true } 
    );
    res.status(201).json(profile);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific post
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate({
      path: "user",
      strictPopulate: false,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// find profile by category
exports.getProfileByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    // Query the database for profiles with the specified category
    const profiles = await Profile.find({ category: category }).populate(
      "user"
    );

    // Check if profiles were found
    if (profiles.length === 0) {
      return res
        .status(404)
        .json({ message: "No profiles found for this category" });
    }

    // Return the found profiles
    res.json(profiles);
  } catch (error) {
    console.error("Error finding profiles by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const { businesshrs, description, wilaya, category } = req.body;

    const newImages = req.imageURLs;

    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updateFields = {};
    if (businesshrs !== undefined) updateFields.businesshrs = businesshrs;
    if (description !== undefined) updateFields.description = description;
    if (wilaya !== undefined) updateFields.wilaya = wilaya;
    if (category !== undefined) updateFields.category = category;
    if (newImages && newImages.length > 0) {
      // Merge the new images with the existing ones
      updateFields.images = [...profile.images, ...newImages];
    }
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).populate("user");
    

    res.json(updatedProfile);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// upload images
exports.uploadImages = async (req, res) => {
  try {
    const images = req.imageURLs;

    // Check if the profile exists
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    // Update the profile with the new images
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: { images } }, // Use $set to update only the images field
      { new: true }
    );

    console.log(updatedProfile);
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// add a comment

exports.addComment = async (req, res) => {
  try {
    const { text, postedBy ,rating} = req.body;
  
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: {rating, text, postedBy}},
  
       },
      { new: true }
    ).populate("user")
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    let totalRating = 0;
    updatedProfile.comments.forEach(comment => {
      totalRating += comment.rating;
    });
    const averageRating = Math.round(totalRating / updatedProfile.comments.length);
updatedProfile = await Profile.findByIdAndUpdate(
  req.params.id,
  { rating: averageRating,
   },
  { new: true }
).populate("user")
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
