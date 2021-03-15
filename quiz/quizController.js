var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Quiz = require('./quiz');

router.post('/', function(req, res) {
    Quiz.getDetail(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/insert', function(req, res) {
    Quiz.insert(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});


module.exports = router;