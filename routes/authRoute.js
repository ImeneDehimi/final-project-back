const express = require("express");
const router = express.Router();

const {imageUpload} = require('../middlewares/imageUpload')
const authController = require("../controllers/authController");

router.post("/register",imageUpload,authController.register);
router.post('/login',authController.login);

module.exports = router;