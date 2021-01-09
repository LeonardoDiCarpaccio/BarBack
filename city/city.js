var db = require("../db");
const { dateNow } = require("../helpers/functions");
const { update } = require("../users/Users");

const City ={
insertCity : function(req, callback){
    var body = req.body
    db.query("INSERT INTO tb_ville ")

},

getIdPerCity : function(req,callback){
var body = req.body
var city
(typeof body.id_owner !=="undefined") ? city=body.id_owner : null

 db.query("SELECT * FROM tb_ville WHERE ville = '"+city+"'",function(err,institution){
if(institution.length>0){
    callback(err,"No city in DB")
}
else{
console.log(institution[0].id_owner)
const dehka = JSON.parse(institution[0].id_owner)
callback(null,dehka)
}

 })

},
getIdPerName_institution : function(req,callback){
    var body = req.body
    var nameInstitution
    (typeof body.name !=="undefined") ? nameInstitution=body.name : null
    
     db.query("SELECT * FROM user WHERE name_institution = '"+nameInstitution+"'",function(err,institution){
    if(institution==="undefined"){
        callback(err,"No city in DB")
    }
    else{
   return  callback(null,institution)
    }
    
     })
    
    },
    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
    
        return db.query(
          "DELETE FROM event_history WHERE id = " + body.id,
          callback
        );
      },
}
module.exports = City