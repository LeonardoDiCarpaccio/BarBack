var db = require("../db");
const { dateNow,cleanQuery } = require("../helpers/functions");

const Command ={

    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


        (typeof body.id != "undefined") ?
            Array.isArray(body.id) ?
                where.push("id IN (" + body.id.join(",") + ")") :
                where.push("id =" + body.id) : null;



        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_commande WHERE " + where.join(" AND "), function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];

            return callback(null, result);
        }) : db.query("SELECT " + target + " FROM tb_commande ", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            
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
        keys.push("date");
        values.push("'"+dateNow()+"'");
        return db.query(
            "INSERT INTO tb_commande (" +
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
        var id = typeof body.id != "undefined" ? body.id : null

var update = []

typeof body.id_detail != "undefined"
? update.push("id_detail = " + body.id_detail )
: null;
typeof body.id_client != "undefined"
? update.push("id_client = " + body.id_client )
: null;
typeof body.status != "undefined"
? update.push("status = " + body.status )
: null;
       Command.get({id : body.id},function(err,command){
               if(command.length>0 && id!==null){
                        
                            return db.query(
                                "UPDATE tb_commande SET "+update.join(",")+" WHERE id = "+id,
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
          "DELETE FROM tb_commande WHERE id = " + body.id,
          callback
        );
      },

}
module.exports = Command