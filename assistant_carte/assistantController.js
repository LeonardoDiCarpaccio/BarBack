var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Assistant = require('./assistant')

router.post("/update", function(req, res){
    Assistant.update(req,function(err , rows){
        if(err){
             res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/", function(req, res){
    Assistant.get(req,function(err , rows){
        if(err){
             res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/insert", function(req, res){
    Assistant.insert(req,function(err , rows){
        if(err){
             res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})
router.post("/delete", function(req, res){
    Assistant.delete(req,function(err , rows){
        if(err){
             res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})




module.exports = router