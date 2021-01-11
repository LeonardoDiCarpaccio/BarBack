var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Items = require('./items');

router.post('/', function(req, res) {
    Items.getItems(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/insert', function(req, res) {
    Items.insert(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/update', function(req, res) {
    Items.update(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});
router.post('/delete', function(req, res) {
    Items.delete(req, function (err, rows) {
        if(err) res.status(400).json(err);
        else res.json(rows);
    });
});

module.exports = router;