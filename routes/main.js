const express = require("express")
const router = express.Router()
const users = require('./users');
const redirectLogin = users.redirectLogin;

// Home page
router.get('/', function(req, res) {
    res.render('index.ejs');
});

// About page
router.get('/about', function(req, res) {
    res.render('about.ejs');
});

// Logout
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/');
        res.send('You are now logged out. <a href="/">Home</a>');
    });
});

module.exports = router;
