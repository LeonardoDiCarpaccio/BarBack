var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const PreviewUser = require("./User/previewUser");
const PreviewOwner = require("./Owner/previewOwner");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var VerifyToken = require("../auth/VerifyToken");



router.post("/getCityFiltered", function(req, res){
    PreviewUser.getCityFiltered(req,function(err , rows){
        if(err){
            res.status(400).json("bug chelou")      }
        else{
            // res.json(rows)
            console.log('getTown done')
        }
    })
})

router.post("/previewOwnerListByCity", function(req, res){
    PreviewUser.previewOwnerListByTown(req,function(err , rows){
        if(err){
            res.status(400).json(err);        
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    })
})

router.post("/getMenuByOwner", function(req, res){
    PreviewUser.getCarteByOwner(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});

router.post("/getOrderbyStatus", function(req, res){
    PreviewOwner.getOrderbyStatus(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});


router.post("/getAssistantCarte", function(req, res){
    PreviewOwner.getAssistantCarte(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});

router.post("/getOrderHisto", function(req, res){
    PreviewUser.getOrderHisto(req, function (err, rows){
        if(err) res.status(400).json(err);
        else res.json(rows)
    })
});

module.exports = router