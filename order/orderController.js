var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Command = require('./order')

router.post("/insert", function(req, res){
    Command.insert(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('insertCommand done')
        }
    })
})

router.post("/", function(req, res){
    Command.get(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getCommand done')
        }
    })
})
router.post("/update", function(req, res){
    Command.update(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getHistoCommand done')
        }
    })
})

router.post("/delete", function(req, res){
    Command.delete(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getHistoCommand done')
        }
    })
})

module.exports = router