const express = require('express')
const router = express.Router()
const authRoute = require('../../routes/authRoute')
const profileRoute = require('../../routes/profileRoute')
const userRoute = require('../../routes/userRoute')


router.use('/auth', authRoute)
router.use('/profile',profileRoute)
router.use('/user', userRoute)

module.exports = router;