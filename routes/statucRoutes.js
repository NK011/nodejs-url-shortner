const express = require('express');
const URLS = require('../models/urls');
const { checkPermission } = require('../middlewares/auth');

const router = express.Router();

router.get('/user/login', (req, res) => {
    return res.render('login')   
})

router.get('/user/signup', (req, res) => {
    return res.render('signup')   
})

router.get('/', checkPermission(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URLS.find()
    return res.render("home", {
        allUrls: allUrls
    })
})

module.exports = router;