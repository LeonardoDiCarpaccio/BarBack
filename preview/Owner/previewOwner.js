const Categories = require("../../category/category");
const City = require("../../city/city");
const Cartes = require('../../cartes/menu');
const Items = require('../../items/items');
var db = require("../../db");
const { dateNow, cleanQuery, TableJsonId, TableJsonIdSpecificKey, isDef, isDefArray } = require("../../helpers/functions");
const Users = require("../../users/Users");
const Order = require("../../order/order");
const Detail = require("../../detail/detail");
const Assistant = require('../../assistant_carte/assistant')

const PreviewOwner = {

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

getAssistantCarte : function(req,callback){
 
    var id_cat = []
    var res  = {assistant : {}};
    Assistant.get({},function(err,rows){
        if(err || rows==undefined){callback(err,"get assistant bug")}
        else{
            var result = (typeof rows != "undefined") ? Object.values(JSON.parse(JSON.stringify(rows))) : [];
            result.forEach((el)=>{
                id_cat.find((elm)=>elm==el.id_category)==undefined ? id_cat.push(el.id_category) : null
                if(res.assistant[el.id_category] == undefined){
                    res.assistant[el.id_category] = [el]
                }else{
                    res.assistant[el.id_category].push(el)
                }
            })

            Categories.get({id : id_cat},function(err,categories){
                if(err ||categories == undefined){callback(err,"get categories bug")}
                else{
                        res["categories"] = TableJsonId({},categories,"id")
                        console.log("assistant",res)
                          return callback(null,res)
                }
            })

        }
    })

}

}
module.exports = PreviewOwner