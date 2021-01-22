var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const PreviewUser = require("./User/previewUser");
const PreviewOwner = require("./Owner/previewOwner");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/getCityFiltered", function(req, res){
    PreviewUser.getCityFiltered(req,function(err , rows){
        if(err){
            res.status(400).json(err);        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    });
});

router.post("/previewOwnerListByCity", function(req, res){
    PreviewUser.previewOwnerListByTown(req,function(err , rows){
        if(err){
            res.status(400).json(err);        
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    });
});

router.post("/getCartesByOwner", function(req, res){
    PreviewUser.getCarteByOwner(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});

router.post("/getCommandbyStatus", function(req, res){
    PreviewOwner.getCommandbyStatus(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});

module.exports = router