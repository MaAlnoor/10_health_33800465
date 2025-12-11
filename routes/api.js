const express = require("express")
const router = express.Router()

router.get('/workouts', function(req, res) {
    let sql = "SELECT * FROM workouts";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
});

module.exports = router;
