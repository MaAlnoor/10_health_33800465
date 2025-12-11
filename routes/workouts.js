const express = require("express")
const router = express.Router()
const users = require("./users");
const redirectLogin = users.redirectLogin;

// Add workout form
router.get('/add', redirectLogin, (req, res) => {
    res.render('addworkout.ejs');
});

// Save workout
router.post('/added', redirectLogin, (req, res, next) => {

    let sql = "INSERT INTO workouts (username, workout_name, duration, intensity, calories, notes) VALUES (?,?,?,?,?,?)";

    let newRecord = [
        req.session.userId,
        req.sanitize(req.body.workout_name),
        req.body.duration,
        req.body.intensity,
        req.body.calories,
        req.sanitize(req.body.notes)
    ];

    db.query(sql, newRecord, (err) => {
        if (err) return next(err);
        res.send("Workout added successfully!");
    });
});

// List workouts
router.get('/list', redirectLogin, (req,res,next) => {
    let sql = "SELECT * FROM workouts WHERE username = ?";
    db.query(sql, [req.session.userId], (err, result) => {
        if (err) return next(err);
        res.render("list.ejs", { workouts: result });
    });
});

// Search workouts
router.get('/search', redirectLogin, (req, res) => {
    res.render("search.ejs");
});

router.get('/search-result', redirectLogin, (req, res, next) => {
    let keyword = req.query.keyword;
    let sql = "SELECT * FROM workouts WHERE username = ? AND workout_name LIKE ?";
    db.query(sql, [req.session.userId, "%" + keyword + "%"], (err, result) => {
        if (err) return next(err);
        res.render("results.ejs", { results: result });
    });
});

// Stats
router.get('/stats', redirectLogin, (req, res, next) => {
    let sql = "SELECT SUM(duration) AS totalMinutes, SUM(calories) AS totalCalories FROM workouts WHERE username = ?";
    db.query(sql, [req.session.userId], (err, result) => {
        if (err) return next(err);
        res.render("stats.ejs", { stats: result[0] });
    });
});

module.exports = router;
