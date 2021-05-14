const Socket = require('./socketRoute/socketRoute');

let app = require('express')();
let server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


io.on('connection', (socket) => {
    console.log("socket connected "),
    socket.on('orderIdDetail', (orderIdDetail) => {
        console.log("orderIdDetail from front", orderIdDetail)
        // console.log(data,"la data depuis owner ")
            // Socket.update({id:num_commande, update["status"]},function(err,status){
            // })
            Socket.get({id_detail :orderIdDetail, only : ["status" ,"num_commande","id_detail"]},function(err,detail){
                console.log(detail, "detail socket ")
                io.emit('users-changed', {status: detail[0].status, num_commande: detail[0].num_commande});    
            })
      });

      socket.on('newOrder',(data)=>{
        console.log("orderOwnerid from front", data)
        Socket.getOrderbyStatus(data, function(err,detail){
            console.log(detail, "getOrderByStatusOwner ")
            io.emit('users-changed', detail);    
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
   console.log('listening in http://localhost:' + port);
});