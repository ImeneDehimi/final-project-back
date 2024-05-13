const express = require("express")
const router = express.Router();
const chatController = require('../controllers/chatController')
const {verifyToken} = require('../middlewares/verifyToken')

router.post('/', verifyToken,chatController.createChat);
router.get('/:userId', verifyToken,chatController.userChats);
router.get('/find/:firstId/:secondId', verifyToken,chatController.findChat);

module.exports = router;