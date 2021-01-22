const Detail = require("../../detail/detail");
const { TableJsonId } = require("../../helpers/functions");
var db = require("../../db");
const { dateNow, cleanQuery } = require("../../helpers/functions");
const Command = require("../../order/order");


const ActionUser = {

passerCommande : function(req,callback){
    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);
    var id_client = typeof body.id_client != "undefined" ? body.id_client : null
    var id_owner = typeof body.id_owner != "undefined" ? body.id_owner : null
    var detail_commande = typeof body.detail_commande != "undefined" ?  body.detail_commande :  null
    var table = typeof body.table != "undefined" ? body.table : null
    if(detail_commande !==  null || table !== null || id_client != null || id_owner != null){
    
       
        Detail.insert({detail : detail_commande,location : table},function(err,detail){
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
}

}
module.exports = ActionUser