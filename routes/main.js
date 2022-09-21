const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const postController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', homeController.getIndex)
router.get('/profile', ensureAuth, postController.getProfile)

module.exports = router