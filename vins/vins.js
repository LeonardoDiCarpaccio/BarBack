var db = require("../db");

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
            res[i].array.push({nom : element.vin_nom1,prix : element.prix1},{nom : element.vin_nom2,prix : element.prix2},{nom : element.vin_nom3,prix : element.prix3})
            i++
    })
            
    callback(null,res)
    });
 


}
}

module.exports = Vins