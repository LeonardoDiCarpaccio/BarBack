var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Command = require('./command')

router.post("/insertCommand", function(req, res){
    Command.insertCommand(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('insertCommand done')
        }
    })
})
router.post("/getCommandOwner", function(req, res){
    Command.getCommandOwner(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getCommandOwner done')
        }
    })
})
router.post("/getHistoCommand", function(req, res){
    Command.getHistoCommand(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getHistoCommand done')
        }
    })
})
router.post("/updateStatus", function(req, res){
    Command.updateCommandStatus(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getHistoCommand done')
        }
    })
})

module.exports = router