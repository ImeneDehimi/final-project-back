const express = require("express");
const router = express.Router();
const messageController = require('../controllers/messageController')
const {verifyToken} = require('../middlewares/verifyToken')


router.get('/:chatId', verifyToken,messageController.getMessages);
router.post('/', verifyToken,messageController.addMessage);




module.exports = router;