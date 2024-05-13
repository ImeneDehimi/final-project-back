const express = require("express");
const router = express.Router();

const {multipleImageUpload} = require('../middlewares/imageUpload')
const {verifyToken} = require('../middlewares/verifyToken')
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
router.put("/:id", multipleImageUpload,verifyToken,profileController.updateProfile)

// upload image
router.put("/upload/:id", multipleImageUpload,profileController.uploadImages)

// add a comment
router.put("/comment/:id" ,profileController.addComment)

// delete a profile 
router.delete("/:id", profileController.deleteProfile)

module.exports = router;