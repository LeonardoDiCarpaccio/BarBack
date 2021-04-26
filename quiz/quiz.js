var db = require('./db2');
const { isDef, cleanQuery } = require('../helpers/functions');

var Items = {
    get: function (req, callback) {
        let body = isDef(req.body) ? req.body : req;
        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
        let table = [];

        if (isDef(body)) {
            if (isDef(body.id)) {
                (Array.isArray(body.id))
                    ? table.push("id IN (" + body.id.join(',') + ")")
                    : table.push("id = " + body.id)
            }

            if (table.length > 0) {
                return db.query('SELECT ' + target + ' FROM resultat WHERE ' + table.join(" AND "), function (err, rows) {
                    var res = Object.values(JSON.parse(JSON.stringify(rows)))
                    var send = {
                        resultat: res
                    }
                    callback(null, send)
                });
            } else {
                console.log('SELECT ' + target + ' FROM resultat');
                return db.query('SELECT ' + target + ' FROM resultat', function (err, rows) {
                    if (err) { callback(err, "pb") } else {
                        console.log(rows)
                        var res = Object.values(JSON.parse(JSON.stringify(rows)))
                        callback(null, res)
                    }

                });
            }
        } else {
            return callback('ERROR PARAMETERS');
        }
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
            "INSERT INTO items (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")",
            callback
        );
    },


}

module.exports = Items;