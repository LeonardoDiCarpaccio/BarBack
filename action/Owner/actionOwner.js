const Category = require("../../category/category");
const Item = require("../../items/items");
const { isDef, cleanQuery } = require("../../helpers/functions");
const Menu = require("../../cartes/menu");

const ActionOwner = {
    // name item  price description  id_cat ==0 ? unknow  need nameCat  :  id_category
    addItemDb: function (req, callback) {
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        console.log(body)

        if (isDef(body.name) && isDef(body.price) && isDef(body.id_category)) {
            if (body.id_category == 0) {
                if(isDef(body.nameCat)){
                Category.insert({name: body.nameCat}, function(err, insert){
                    if(err) callback(err, "can't insert category")
                    Item.insert({ name: body.name, price: body.price, id_category: insert.insertId, description: body.description,disponibility : body.disponibility }, function (err, inserts) {
                        if (err) callback(err, "can't insert item");
                        else{ 
                            // callback(null, inserts.insertId);
                            Menu.update({id_owner : body.id_owner,id_item : inserts.insertId},function(err,menu){
                           if(err){callback(err,"failed")}
                           else{
                               callback(null,menu)
                           }
                            })
                        }
                    })
                })
            }else{
                callback(err, 'error insert item missing name category')
            }
            } else {
                Item.insert({ name: body.name, price: body.price, id_category: body.id_category, description: body.description,disponibility : body.disponibility }, function (err, inserts) {
                    if (err) callback(err, "can't insert item");
                    else {
                        Menu.update({id_owner : body.id_owner,id_item : inserts.insertId},function(err,menu){
                            if(err){callback(err,"failed")}
                            else{
                                callback(null,menu)
                            }
                             })
                    }
                })
            }
        } else {
            callback(err, 'error parameters');
        }

    }
}

module.exports = ActionOwner;