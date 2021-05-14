var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const Socket = require('./socketRoute');



router.post("/update", function(req, res){
    Socket.update(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('')
        }
    })
})

router.post("/", function(req, res){
    Socket.get(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('socket get info route')
        }
    })
})
router.post("/getOrderbyStatus", function(req, res){
    Socket.getOrderbyStatus(req,function(err , rows){
        if(err){
 res.status(400).json(err)        }
        else{
            res.json(rows)
            console.log('socket get info route')
        }
    })
})
module.exports = router;