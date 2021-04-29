const Detail = require("../../detail/detail");
const { TableJsonId } = require("../../helpers/functions");
var db = require("../../db");
const { dateNow, cleanQuery } = require("../../helpers/functions");
const Command = require("../../order/order");
const Users = require("../../users/Users");
var express = require('express')
var path     = require('path');



const ActionUser = {

passerCommande : function(req,callback){
    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);
    var id_client = typeof body.id_client != "undefined" ? body.id_client : null
    var id_owner = typeof body.id_owner != "undefined" ? body.id_owner : null
    var detail_order = typeof body.detail_order != "undefined" ?  body.detail_order :  null
    console.log(body.location,"table")

    var table = typeof body.location != "undefined" ? body.location : null
    if(detail_order !==  null || table !== null || id_client != null || id_owner != null){
    
        Detail.insert({detail : detail_order,location : table},function(err,detail){
            console.log("detail",detail)
            console.log(body,"body")
            if(err){callback(err,"cant insert detail")}
            else{
               Command.insert({id_client : id_client,id_owner:id_owner,id_detail : detail.insertId,status : 1},function(err,insert){console.log(insert,"efuçuhfoe")
                   if(err){callback(err,"cant insert")}
                   else{callback(null,'ok')}
               })
            }
        })

    }else {
        callback(null,"no detail")
    }

},

getImgById : function(req, callback){
    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);
    var id_user = typeof body.id != "undefined" ? body.id : null
    if(id_user !== null){
        Users.get({id_user :id_user}, function(err,res){
            if(err) callback(err, "Cannot get image from id");
            else callback(null ,res[0].img);
            console.log(res[0].img)
        })
    }
    

}



}
module.exports = ActionUser