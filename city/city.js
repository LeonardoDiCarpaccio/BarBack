var db = require("../db");
const { update } = require("../users/Users");
const { dateNow,cleanQuery } = require("../helpers/functions");

const City ={

    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.ville != "undefined") ?
            Array.isArray(body.ville) ?
                where.push("ville IN (" + body.ville.join(",") + ")") :
                where.push("ville = '" + body.ville+"'") : null;


                console.log("SELECT " + target + " FROM tb_ville WHERE " + where.join(" AND "));

        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_ville WHERE " + where.join(" AND "), function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

            result.forEach((el)=>{
                    typeof el.id_owner != "undefined" ? el.id_owner = JSON.parse(el.id_owner) : null;
                
            })
            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM tb_ville ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            result.forEach((el)=>{
                typeof el.id_owner != "undefined" ? el.id_owner = JSON.parse(el.id_owner) : null;
            
        })
            
        return callback(null, result);
        })


    },

    insert: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
        body = cleanQuery(body);

        var keys = [];
        var values = [];
        for (const [key, value] of Object.entries(body)) {
            if (value != null) {
                typeof value == "string"
                    ? values.push("'" + value + "'")
                    : typeof value == "int" ?
                        values.push(value) : values.push("'" + JSON.stringify(value) + "'")
                keys.push(key);
            }
        }

        return db.query(
            "INSERT INTO tb_ville (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },

    update: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
        body = cleanQuery(body);
        var ville = typeof body.ville != "undefined" ? body.ville : null
        var id_owner = typeof body.id_owner != "undefined" ? JSON.stringify(body.id_owner) : null
       City.get({ville : ville},function(err,villes){
           console.log(villes)
               if(villes.length>0 && ville!==null){
                        
                            return db.query(
                                "UPDATE tb_ville SET id_owner = "+id_owner+"WHERE ville = '"+ville+"'",
                                  callback
                              );
               }
                    else{
                            callback(null,"no updated")
                    }
                
     
       })
    

    },

    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
    
        return db.query(
          "DELETE FROM tb_ville WHERE ville = '" + body.ville+"'",
          callback
        );
      },
}
module.exports = City