const Categories = require("../../categories/categories");
const City = require("../../city/city");
const Cartes = require('../../cartes/cartes');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");
const Command = require("../../command/Command")


const PreviewOwner = {

getCommandbyStatus : function(req, callback) {

    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);
    var status = typeof body.status != "undefined" ? body.status : null
    var id_owner = typeof body.id_owner != "undefined" ? body.id_owner : null
    var id_user = typeof body.id_user != "undefined" ? body.id_user : null

    Command.get({status : status, id_owner : id_owner, id_client : id_user}, function(err, command){
        if(command.length === 0){
            callback(null, "no command or worng id provided")
        }
        else{
            callback(null, command)
        }
    })

},

}
module.exports = PreviewOwner