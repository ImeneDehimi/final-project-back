const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

// get user route
router.get('/:id', userController.getUserById)

// get all users
router.get('/', userController.getAllUsers)

// update user
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deletUser);

module.exports = router;