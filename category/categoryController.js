var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Category = require('./category')

router.post("/update", function(req, res){
    Category.update(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/", function(req, res){
    Category.get(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/insert", function(req, res){
    Category.insert(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/delete", function(req, res){
    Category.delete(req,function(err , rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})




module.exports = router