
var db = require("../../db");
const { dateNow,cleanQuery } = require("../../helpers/functions");
var io = require("../index")
const Order = require("../../order/orderController");
const Detail = require("../../detail/detail");
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

getOrderbyStatus : function(req, callback) {
    res ={}
 var body = (typeof req.body != "undefined") ? req.body : req;
 body = cleanQuery(body);
 var id_detail_array = []
 Order.get(body, function(err, Order){
     if(Order.length === 0 || err){
         callback(null, "no Order or worng id provided")
     }
     else{
                 Order.forEach(element => {
                     if(id_detail_array.find((el)=>el==element.id_detail)===undefined){
                                 id_detail_array.push(element.id_detail)
                     }
                 });

                 Detail.getDetail({id : id_detail_array},function(err,detail){
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