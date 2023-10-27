//Initialize the express 'app' object
let express = require("express");
let app = express();

app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);

//'port' variable allowd for deployment
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Socket.io Code
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);

//Listen for socket connections
io.on("connection", (socket) => {

  console.log("We have a new client connected!")
  console.log(socket.id);

  //Listening for mnouse move
  socket.on('data', (data) => {
    //console.log("Received a msg called 'data'");
    //console.log(socket.id);
    //console.log(data);

    //Send message to the clients
    //Send data to ALL clients, including this one
    io.emit('dataAll', data);

    //Send data to ALL other clients, except for the sender
    // socket.broadcast.emit('data', data);

    //Send the data to just the sender
    // socket.emit('data', data);

  });

  //Listening for mouse click
  socket.on('dataPress', (data) => {
    io.emit('dataPressAll', data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});