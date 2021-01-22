var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Order = require('./order')

router.post("/insert", function(req, res){
    Order.insert(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('insertOrder done')
        }
    })
})

router.post("/", function(req, res){
    Order.get(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getOrder done')
        }
    })
})
router.post("/update", function(req, res){
    Order.update(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getHistoOrder done')
        }
    })
})

router.post("/delete", function(req, res){
    Order.delete(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('getHistoOrder done')
        }
    })
})

module.exports = router