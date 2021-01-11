const Categories = require("../../categories/categories");
const City = require("../../city/city");
var db = require("../../db");
const { dateNow, cleanQuery,TableJsonId, TableJsonIdSpecificKey } = require("../../helpers/functions");
const Users = require("../../users/Users");

const PreviewUser = {

    getTownFiltered : function(req,callback){
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var where =[]

        if (
            typeof body.ville != "undefined"&&
            body.ville.length > 0
          ) {
        
              where.push("ville LIKE '" + body.ville + "%'");
           
          }
        db.query("SELECT ville FROM tb_ville WHERE "+where,function(err,rows){
            if(err || rows.length ===0){callback(err,"no town found")}
            else{
                callback(null,rows)
            }
        })
    },
    previewOwnerListByTown : function(req,callback){
        var body = (typeof req.body != "undefined") ? req.body : req;
        body = cleanQuery(body);
        var ville = typeof body.ville != "undefined" ? body.ville : null
        var res = {}
        var arrayIdOwner = []
        var id_categorie = []
        if(ville!= null){
            City.get({ville : ville,only : ["id_owner"]},function(err,owner){
                    if(err || owner.length ===0){callback(err,"no bar")}

                    else{
                        owner.forEach(element => {
                            if(typeof element.id_owner != "undefined" ){
                                if(Array.isArray(element.id_owner)===true){
                                    element.id_owner.forEach((el)=>arrayIdOwner.push(el))
                                }
                            }
                    });
    
                    if(arrayIdOwner.length===0){
                        callback(err,"no bar")
                    }
    
                    Users.get({id_user : arrayIdOwner,only : ["id_user,name_institution,role,id_categorie"]},function(err,users){
                        if(err || users.length ===0){
                            callback(err,"no bar")
                        }else{
                            console.log(users)

                            users.forEach((el,index)=>{

                                if(el.role!==2){
                                    users.splice(index,1)
                                }else{
                                    id_categorie.push(el.id_categorie)
                                }
                        })
                        Categories.get({id_categorie : id_categorie},function(err,categories){
                            console.log(categories)
                            if(err || categories.length ===0) {callback(err,"no categories")}
                            else{
                                console.log(categories)
                                    var obj = {}
                                    res["categories"] = TableJsonIdSpecificKey(obj,categories,"id_categorie","name")
                                    res["owner"] = users
                                    callback(null,res)
                            }
                        })
                        }

                        
                    })

                    }
               
          })
        }else{
            callback(null,"no bar")
        }
        


    }


}
module.exports = PreviewUser