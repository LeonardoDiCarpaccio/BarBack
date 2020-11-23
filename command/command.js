var db = require("../db");
const { dateNow } = require("../helpers/functions");
const { update } = require("../users/Users");

const Command ={
insertCommand : function(req, callback)
{   
    var details =   { 
        items : [
        {nom : 'Mojito', prix : 15, qty  : 2},
        {nom : 'Pastis', prix : 2, qty : 10}],
        total : 0}
        
    var totalcalcul = 0
    var body=req.body
    body.detail = details
    console.log(body)
    var column = []
    var values = []
    if(body.date!=="undefined"){
        column.push('date')
        values.push(body.date)
    }
    if(body.id_owner!=="undefined"){
        column.push('id_owner')
        values.push(body.id_owner)
    }
    if(body.id_client!=="undefined"){
        column.push('id_client')
        values.push(body.id_client)
    }
    if(body.location!=="undefined"){
        column.push('location')
        values.push(body.location)
    }
    if(body.status!=="undefined"){
        column.push('status')
        values.push(body.status)
    }
    if(body.detail!=="undefinded"){
        column.push('detail')
        for(i=0; i<details.items.length; i++){
            details.total += details.items[i].prix * details.items[i].qty
        }
        console.log(details.total)
        body.detail = JSON.stringify(body.detail)
        values.push(body.detail)
    }
    db.query("INSERT INTO tb_commande ("+column.join(",")+") VALUES ('"+values.join("','")+"')",callback)

    
},
getCommandOwner : function(req, callback){
    var body=req.body
    console.log(body)
    db.query("SELECT * FROM tb_commande WHERE status = 2 AND id_owner = '"+body.id+"' ORDER BY date" ,
    function(err , command){
    command.forEach(elt => {
            elt.detail = JSON.parse(elt.detail)
        });
        callback(null,command)
    })

},

getHistoCommand : function(req, callback){
    var body = req.body
    db.query("SELECT * FROM tb_commande WHERE status = 1 AND id_owner '"+body.id+"' ORDER BY date",
    function(err , command){
        command.forEach(elt => {
                elt.detail = JSON.parse(elt.detail)
            });
            callback(null,command)
        })
}
}
module.exports = Command