let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Equation model
let equationSchema = require('../models/Equation')


// Read Equation
router.route('/').get((req, res) => {
    equationSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;