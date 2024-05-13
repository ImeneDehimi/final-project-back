const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')
const {verifyToken} = require('../middlewares/verifyToken')


// get all users
router.get('/', userController.getAllUsers)

// get user route
router.get('/:id', userController.getUserById)

// update user
router.put("/:id", verifyToken,userController.updateUser);

// delete user
router.delete("/:id", userController.deletUser);

module.exports = router;