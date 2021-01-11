var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Categories = require('./categories')

router.post("/update", function(req, res){
    Categories.update(req,function(err , rows){
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
    Categories.get(req,function(err , rows){
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
    Categories.insert(req,function(err , rows){
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
    Categories.delete(req,function(err , rows){
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