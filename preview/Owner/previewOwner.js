const Categories = require("../../category/category");
const City = require("../../city/city");
const Cartes = require('../../cartes/menu');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");
const Order = require("../../order/order");
const Detail = require("../../detail/detail");


const PreviewOwner = {

getOrderbyStatus : function(req, callback) {
       res ={}
    var body = (typeof req.body != "undefined") ? req.body : req;
    body = cleanQuery(body);
    var id_detail_array = []
    Order.get(body, function(err, Order){
        console.log(Order)
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
                        console.log('detail',detail)
                        if(err || detail.length == 0){
                            callback(err,"no detail")
                        }else{
                           res['detail']=[...detail]
                            callback(null,res)
                        }
                    })
        }
    })

},

}
module.exports = PreviewOwner