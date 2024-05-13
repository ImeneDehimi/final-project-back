const express = require('express')
const router = express.Router()
const authRoute = require('../../routes/authRoute')
const profileRoute = require('../../routes/profileRoute')
const userRoute = require('../../routes/userRoute')
const chatRoute = require('../../routes/chatRoute')
const messageRoute = require('../../routes/messageRoute')


router.use('/auth', authRoute)
router.use('/profile',profileRoute)
router.use('/user', userRoute)
router.use('/chat', chatRoute)
router.use('/message', messageRoute)

module.exports = router;