const Socket = require('./socketRoute/socketRoute');

let app = require('express')();
let server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  var cors = require('cors');
  
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions));app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  next();
  });

io.on('connection', (socket) => {
    socket.on('orderIdDetail', (orderIdDetail) => {
            Socket.get({id_detail :orderIdDetail, only : ["status" ,"num_commande","id_detail"]},function(err,detail){
                io.emit('users-changed', {status: detail[0].status, num_commande: detail[0].num_commande});    
            })
      });

      socket.on('newOrder',(data)=>{
        data["status"] = 1
        // console.log("orderOwnerid from front", data)

        Socket.getOrderbyStatus(data, function(err,detail){
            console.log(detail, "getOrderByStatusOwner ")
            io.emit('orders-changed', detail);    
        })
      })
      

  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
 
  socket.on('send-message', (message) => {
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  });
});
 
var port = process.env.PORT || 3001;

server.listen(port, function(){
   console.log('listening in http://localhost:' + port)
});