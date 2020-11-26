var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var City = require('./city')

router.post("/insertCity", function(req, res){
    City.insertCity(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('insertCity done')
        }
    })
})

router.post("/getCity", function(req, res){
    City.getCity(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCity done')
        }
    })
})

module.exports = router