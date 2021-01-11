var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const PreviewUser = require("./User/previewUser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post("/getTownFiltered", function(req, res){
    PreviewUser.getTownFiltered(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    })
})

router.post("/previewOwnerListByTown", function(req, res){
    PreviewUser.previewOwnerListByTown(req,function(err , rows){
        if(err){
            console.log(err)
        }
        else{
            res.json(rows)
            console.log('getTown done')
        }
    })
})

module.exports = router