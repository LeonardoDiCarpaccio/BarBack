
const { exec } = require("child_process");

var shell = require('shelljs');

const Category = {
    //GET
    get: function (req, callback) {
       

        exec("cd .. & git pull origin main ", (error, stdout, stderr) => {
        
            if(stdout){
                shell.exec('pm2 restart server.js', function(code, output) {
                    console.log('Exit code:', code);
                    console.log('Program output:', output);
                  });
            }
       
        });

    },


}

module.exports = Category