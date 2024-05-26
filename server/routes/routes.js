const express = require('express')
const { logIn,
    tokenVerification,
    updateProfile,
    getUserProfile,
     registerUser } = require('../controllers/controllers')
const router = express.Router()

router.route('/login').post(logIn)
router.route('/register').post(registerUser)
router.route('/update-profile').post(updateProfile)
router.route('/profile').get(tokenVerification, getUserProfile)

module.exports = router