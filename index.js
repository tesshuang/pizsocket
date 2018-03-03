const server = require("http").Server();
const port = process.env.PORT || 4008;
var io = require("socket.io")(server);

var pizUsers = {};


io.on("connection",function(socket){
    console.log("user has connected");
    
    /*socket.emit("yourid", socket.id);*/
    socket.on("joinroom", function(data){
        
        socket.join(data);
        socket.myRoom = data;

        if(!pizUsers[data]){
            pizUsers[data] = [];

        }

        pizUsers[data].push(socket.id);
        io.emit("pizzauser", pizUsers);
        console.log(pizUsers);

        socket.on("mymove", function(data){
            socket.broadcast.emit("newmove", data);
        });
    })
    
    
    
    /*socket.on("disconnect", function(data){
       var index = pizUsers.indexOf(socket.id);
        pizUsers.splice(index, 1);
        io.emit("pizzauser", pizUsers);
    });*/
});

server.listen(port, (err)=>{
    if(err){
        console.log("Err is "+err);
        return false
    }
    console.log("Pizza socket is running.");
})