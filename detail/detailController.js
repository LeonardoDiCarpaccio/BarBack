var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Detail = require('./detail');

router.post('/', function(req, res) {
    Detail.getDetail(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/insert', function(req, res) {
    Detail.insert(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/update', function(req, res) {
    Detail.update(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/delete', function(req, res) {
    Detail.delete(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

module.exports = router;