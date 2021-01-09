var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Carte = require('./cartes')

router.post("/update", function(req, res){
    Carte.update(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCarte done')
        }
    })
})
router.post("/", function(req, res){
    Carte.get(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCarte done')
        }
    })
})
router.post("/insert", function(req, res){
    Carte.insert(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCarte done')
        }
    })
})
router.post("/delete", function(req, res){
    Carte.delete(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCarte done')
        }
    })
})




module.exports = router