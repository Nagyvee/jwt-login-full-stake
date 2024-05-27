const express = require('express')
const { logIn,
    tokenVerification,
    updateProfile,
    getUserProfile,
     registerUser } = require('../controllers/controllers')
const {uploadFile} = require("../controllers/imgController")   
const {upload} = require("../controllers/imgController")
const router = express.Router()

router.route('/login').post(logIn)
router.route('/register').post(registerUser)
router.route('/update-profile').post(upload.single("img"),uploadFile)
router.route('/profile').get(tokenVerification, getUserProfile)

module.exports = router