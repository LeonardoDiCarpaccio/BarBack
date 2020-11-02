var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Vins = require('./vins')

router.post("/getVins",function(req,res){
    Vins.getWine(req,function(err,rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
        }
    })
})

router.post("/addhisto",function(req,res){
    Vins.AddToHisto(req,function(err,rows){
        if(err){

            console.log("from controller"+err)
        }
        else{
            res.json(rows)
        }
    })
})

module.exports = router