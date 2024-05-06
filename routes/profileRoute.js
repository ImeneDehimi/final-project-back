const express = require("express");
const router = express.Router();

const {multipleImageUpload} = require('../middlewares/imageUpload')
const profileController = require("../controllers/profileController");

// create a profile 
router.post("/",profileController.createProfile)

// get all profiles  
router.get("/", profileController.getAllProfiles)

// get one profile
router.get("/:id", profileController.getProfileById)

// get profiles by category
router.get('/category/:category',profileController.getProfileByCategory)

// update a profile 
router.put("/:id", multipleImageUpload,profileController.updateProfile)

// delete a profile 
router.delete("/:id", profileController.deleteProfile)

module.exports = router;