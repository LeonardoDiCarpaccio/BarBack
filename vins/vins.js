var db = require("../db");
const { dateNow } = require("../helpers/functions");
const { update } = require("../users/Users");

const Vins = {
getWine : function(req,callback){
    var i = 0


return db.query("SELECT * FROM vins",function(err,wine){
    var res = new Array
    if(err){
        console.log(err)
    }
    var i = 0
    console.log("res"+res.length)
    wine.forEach(element => {
      const response = {
          wine : element,
          array : []
      }
        res.push(response)
            res[i].array.push({nom : element.vin_nom1,prix : element.prix1,qte : 0},{nom : element.vin_nom2,prix : element.prix2,qte : 0},{nom : element.vin_nom3,prix : element.prix3,qte : 0})
            i++
    })
            
    callback(null,res)
    });

},

AddToHisto : function(req,callback){
   
    // const dehka = new Date()
var body=req.body
console.log(body)
var updating=[]



if(body.update!=="undefinded"){

    body.update.forEach((el)=>{
               const tempo = "('"+el.nom+"',"+el.qte+","+el.prix+","+el.total+",'"+el.nom_prenom+"','"+el.email+"','"+dateNow()+"','"+el.phone+"','"+el.adresse+"')"
              updating.push(tempo)
})

}
else{
    callback(err,"mauvais body le sang")
}

    return updating.length>1 ? db.query("INSERT INTO historique (nom,qte,prix,total,nom_prenom,email,date,phone,adresse) VALUES "+updating.join(",")+";",callback)
   :  db.query("INSERT INTO historique (nom,qte,prix,total,nom_prenom,email,date,phone,adresse) VALUES "+updating[0],callback)




//     (typeof(body.update)!=="undefined") ? 
//    (Array.isArray(body.update))? body.update.forEach((el)=>{
//        const tempo = "('"+el.nom+"',"+el.qte+","+el.prix+","+el.total+"'"+el.nom_prenom+"','"+el.email+"',"+dehka+"'"+el.phone+"','"+el.adresse+"')"
//        updating.push(tempo)
//    }) : updating=body.update : null

//    return (Array.isArray(update)) ? db.query("INSERT INTO historique (nom,qte,prix,total,nom_prenom,email,date,phone,adresse) VALUES "+update.join(",")+";",callback)
//     :  db.query("INSERT INTO historique (nom,qte,prix,total,nom_prenom,email,date,phone,adresse) VALUES "+update,callback)
}



}

module.exports = Vins