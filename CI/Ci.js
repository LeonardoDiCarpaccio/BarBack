
const { exec } = require("child_process");

var shell = require('shelljs');

const Category = {
    //GET
    get: function (req, callback) {
    

        exec("cd .. & git pull origin main ", (error, stdout, stderr) => {
       
            
                shell.exec('pm2 restart server.js', function(code, output) {
                   return callback(null,output)
                  });
            
       
        });

    },


}

module.exports = Category