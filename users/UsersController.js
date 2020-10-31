var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
const Users = require('./Users');

var VerifyToken = require('../auth/VerifyToken');


router.post('/', VerifyToken,function (req, res) {
    Users.getUsers(req,function(err,rows){

        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    })
 
});

router.delete('/delete',function (req,res){
    Users.delete(req, function(err,rows){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(rows)
        }
    })
})

router.post('/update',function (req,res){
    Users.update(req, function(err,rows){
        if(err){
            res.status(400).json(err)
        }
        else {
            res.json(rows)
        }
    })
})
module.exports = router;