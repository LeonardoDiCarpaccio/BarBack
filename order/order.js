var db = require("../db");
const { dateNow,cleanQuery } = require("../helpers/functions");

const Order ={

    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}


     

        (typeof body.status != "undefined") ?
            Array.isArray(body.status) ?
                where.push("status IN (" + body.status.join(",") + ")") :
                where.push("status =" + body.status) : null;
        
        (typeof body.id != "undefined") ?
            Array.isArray(body.id) ?
                where.push("id IN (" + body.id.join(",") + ")") :
                where.push("id =" + body.id) : null;
            
                (typeof body.num_commande != "undefined") ?
                Array.isArray(body.num_commande) ?
                    where.push("num_commande IN (" + body.num_commande.join(",") + ")") :
                    where.push("num_commande =" + body.num_commande) : null;
                
                (typeof body.id_owner != "undefined") ?
                Array.isArray(body.id_owner) ?
                    where.push("id_owner IN (" + body.id_owner.join(",") + ")") :
                    where.push("id_owner =" + body.id_owner) : null;
        (typeof body.id_client != "undefined") ?
                    Array.isArray(body.id_client) ?
                        where.push("id_client IN (" + body.id_client.join(",") + ")") :
                        where.push("id_client =" + body.id_client) : null;
                            console.log("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND "));
        (where.length > 0) ? db.query("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND ") +" ORDER BY date DESC", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            console.log(result)
            return callback(null, result);
        
        }) : db.query("SELECT " + target + " FROM tb_order ORDER BY date DESC", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            console.log(result)

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
            "INSERT INTO tb_order (" +
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
    
                        console.log("UPDATE tb_order SET "+update.join(",")+" WHERE id_detail = "+id)
                            return db.query(
                                "UPDATE tb_order SET "+update.join(",")+" WHERE id_detail = "+id,
                                  callback
                              );
               
    },
    delete: function (req, callback) {
        var body = typeof req.body != "undefined" ? req.body : req;
    
        return db.query(
          "DELETE FROM tb_order WHERE id = " + body.id,
          callback
        );
      },

}
module.exports = Order