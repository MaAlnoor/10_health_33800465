const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {

        // If on university server, redirect there
        if (req.headers.host.includes("doc.gold.ac.uk")) {
            return res.redirect("/usr/442/users/login");
        }

        // Otherwise you're on localhost
        return res.redirect("/users/login");
    }
    next();
};

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/registered', [
    check('first').notEmpty(),
    check('last').notEmpty(),
    check('username').isLength({ min: 5, max: 20 }),
    check('email').notEmpty().isEmail(),
    check('password').isLength({ min: 8 })
], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register.ejs');
    }

    let checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkQuery, [req.body.username, req.body.email], (err, results) => {
        if (err) return next(err);

        if (results.length > 0) {
            return res.send("Username or email already exists.");
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);

            let sqlquery = "INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES (?,?,?,?,?)";
            let newUser = [
                req.sanitize(req.body.username),
                req.sanitize(req.body.first),
                req.sanitize(req.body.last),
                req.body.email,
                hashedPassword
            ];

            db.query(sqlquery, newUser, (err) => {
                if (err) return next(err);

                res.send(
                    'Hello ' + req.sanitize(req.body.first) + ', you are now registered! ' +
                    '<a href="/">Home</a>'
                );                
            });
        });
    });
});

// Login page
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// Login POST
router.post('/loggedin', [
    check('username').notEmpty(),
    check('password').notEmpty()
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.render('login');

    db.query("SELECT * FROM users WHERE username = ?", [req.body.username], (err, results) => {
        if (err) return next(err);

        if (results.length === 0) return res.send("Invalid username or password.");

        let hashedPassword = results[0].hashedPassword;

        bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
            if (err) return next(err);

            if (result === true) {
                req.session.userId = req.body.username;
                return res.send(
                    "Welcome back " + results[0].first_name + " " + results[0].last_name +
                    "! <a href='/'>Home</a>"
                );
            } else {
                return res.send("Invalid username or password.");
            }
        });
    });
});

module.exports = router;
module.exports.redirectLogin = redirectLogin;
