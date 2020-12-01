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

router.post("/getIdByCity", function(req, res){
    City.getIdPerCity(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCity done')
        }
    })
})
router.post("/getIdByName", function(req, res){
    City.getIdPerName_institution(req,function(err , rows){
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