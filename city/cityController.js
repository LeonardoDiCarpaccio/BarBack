var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var City = require('./city')

router.post("/", function(req, res){
    City.get(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
            console.log('insertCity done')
        }
    })
})

router.post("/insert", function(req, res){
    City.insert(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
            console.log('getCity done')
        }
    })
})
router.post("/update", function(req, res){
    City.update(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
            console.log('getCity done')
        }
    })
})

module.exports = router