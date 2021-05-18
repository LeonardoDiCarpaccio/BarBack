
var db = require("../../db");
var io = require("../index")
const { isDef, cleanQuery,dateNow } = require('../../helpers/functions');

const Socket ={

    get: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);

        let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

        var where = [];
        // body : {"dateadded_inf" :"2020"}
                (typeof body.id_detail != "undefined") ?
                Array.isArray(body.id_detail) ?
                    where.push("id_detail IN (" + body.id_detail.join(",") + ")") :
                    where.push("id_detail =" + body.id_detail) : null;
                            
                        console.log("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND "));
       

                            (where.length > 0) ? db.query("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND ") +" ORDER BY date DESC", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            // console.log(result)
            return callback(null, result);
        
        }) : db.query("SELECT " + target + " FROM tb_order ORDER BY date DESC", function (err, rows) {
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            // console.log(result)

        return callback(null, result);
        })


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
    // io.emit('users-changed', {user:'joined'});   
                        return db.query(
                            "UPDATE tb_order SET "+update.join(",")+" WHERE id_detail = "+id,
                              callback
                          );
           
},
getOrder: function (req, callback) {
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
        console.log(result,"result from")
        return callback(null, result);
    
    }) : db.query("SELECT " + target + " FROM tb_order ORDER BY date DESC", function (err, rows) {
        var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
        console.log(result)

    return callback(null, result);
    })


},
// getOrder: function (req, callback) {
//     var body = (typeof req.body != "undefined") ? req.body : req;
//     body = cleanQuery(body);

//     let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*"; // 

//     var where = [];
//     // body : {"dateadded_inf" :"2020"}


 

//     (typeof body.status != "undefined") ?
//         Array.isArray(body.status) ?
//             where.push("status IN (" + body.status.join(",") + ")") :
//             where.push("status =" + body.status) : null;
    
//     (typeof body.id != "undefined") ?
//         Array.isArray(body.id) ?
//             where.push("id IN (" + body.id.join(",") + ")") :
//             where.push("id =" + body.id) : null;
        
//             (typeof body.num_commande != "undefined") ?
//             Array.isArray(body.num_commande) ?
//                 where.push("num_commande IN (" + body.num_commande.join(",") + ")") :
//                 where.push("num_commande =" + body.num_commande) : null;
            
//             (typeof body.id_owner != "undefined") ?
//             Array.isArray(body.id_owner) ?
//                 where.push("id_owner IN (" + body.id_owner.join(",") + ")") :
//                 where.push("id_owner =" + body.id_owner) : null;
//     (typeof body.id_client != "undefined") ?
//                 Array.isArray(body.id_client) ?
//                     where.push("id_client IN (" + body.id_client.join(",") + ")") :
//                     where.push("id_client =" + body.id_client) : null;
//                         console.log("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND "));
//     (where.length > 0) ? db.query("SELECT " + target + " FROM tb_order WHERE " + where.join(" AND ") +" ORDER BY date DESC", function (err, rows) {
//         var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
//         console.log(result)
//         return callback(null, result);
    
//     }) : db.query("SELECT " + target + " FROM tb_order ORDER BY date DESC", function (err, rows) {
//         var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
//         console.log(result)

//     return callback(null, result);
//     })


// },


// getDetail: function (req, callback) {
//     let body = isDef(req.body) ? req.body : req;
//     let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
//     let table = [];

//     if (isDef(body)) {
//         if (isDef(body.id)) {
//             (Array.isArray(body.id))
//                 ? table.push("id IN (" + body.id.join(',') + ")")
//                 : table.push("id = " + body.id)
//         }

//         if (table.length > 0)
//             return db.query('SELECT ' + target + ' FROM detail WHERE ' + table.join(" AND ") +" ORDER BY date DESC", function(err,detail){
//                 var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
//                 result.forEach(element => {
//                         typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
//                         typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

//                 });
//                 callback(null,result)
//             });
//         else
//             return db.query('SELECT ' + target + ' FROM detail ORDER BY date DESC',function(err,detail){
//                 var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
//                 result.forEach(element => {
//                     typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
//                     typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

//             });
//                 callback(null,result)

//             });
//     } else {
//         return callback('ERROR PARAMETERS');
//     }
// },
getDetail: function (req, callback) {
    let body = isDef(req.body) ? req.body : req;
    let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
    let table = [];

    if (isDef(body)) {
        if (isDef(body.id)) {
            (Array.isArray(body.id))
                ? table.push("id IN (" + body.id.join(',') + ")")
                : table.push("id = " + body.id)
        }

        if (table.length > 0)
            return db.query('SELECT ' + target + ' FROM detail WHERE ' + table.join(" AND ") +" ORDER BY date DESC", function(err,detail){
                var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
                result.forEach(element => {
                        typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
                        typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

                });
                callback(null,result)
            });
        else
            return db.query('SELECT ' + target + ' FROM detail ORDER BY date DESC',function(err,detail){
                var result = (typeof detail != "undefined") ? Object.values(JSON.parse(JSON.stringify(detail))) : [];
                result.forEach(element => {
                    typeof element.detail != "undefined" ? element.detail = JSON.parse(element.detail) : null
                    typeof element.location != "undefined" ? element.location = JSON.parse(element.location) : null

            });
                callback(null,result)

            });
    } else {
        return callback('ERROR PARAMETERS');
    }
},
getOrderbyStatus : function(req, callback) {
    res ={}
 var body = (typeof req.body != "undefined") ? req.body : req;
 body = cleanQuery(body);
 var id_detail_array = []

 Socket.getOrder(body, function(err, Order){
     if(Order ==null || err){
         callback(null, "no Order or worng id provided")
     }
     else{
                 Order.forEach(element => {
                     if(id_detail_array.find((el)=>el==element.id_detail)===undefined){
                                 id_detail_array.push(element.id_detail)
                     }
                 });

                 Socket.getDetail({id : id_detail_array},function(err,detail){
                     if(err || detail.length == 0){
                         callback(err,"no detail")
                     }else{
                         console.log(Order,"order",detail,"detail")
                         detail.forEach((el)=>{
                             // console.log(Order[Order.findIndex((l)=>l.id_detail==el.id)].nb_commande)

                             el["num_cmd"] = Order[Order.findIndex((l)=>l.id_detail==el.id)].num_commande
                         })
                        res['detail']=[...detail]
                         callback(null,res)
                     }
                 })
     }
 })

},
}
module.exports = Socket