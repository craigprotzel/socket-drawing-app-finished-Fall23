## Socekt.io - Drawing App Finished

### Local Setup
- `cd` via the commnad line to the project folder
- Run `npm install` to load dependencies listed in package.json

### Code Steps - Included
- **STEP 1:**	Client-Side Setup - HTML, CSS, & JS
  - Make sure the socket.io library is included in the HTML
  - Need the following HTML `<script src="/socket.io/socket.io.js"></script>`
- **STEP 2:**	Server-Side Setup - Express, HTTP Server & .env port

### Code Steps - To Do
- **STEP 3:**	Server-Side Socket.io Initialization + Connection
```
//Initialize socket.io
let io = require("socket.io");
io = new io.Server(server);
```
```
//Listen for individual clients/users to connect
io.on("connection", (socket) => {
  console.log("We have a new client: " + socket.id);
  
  //Listen for messages from the client


  //Listen for this client to disconnect
  socket.on("disconnect", () => {
    console.log("A client has disconnected: " + socket.id);
  });
});
```

- **STEP 4:**	Client-Side Socket.io Initialization + Connection
```
//Open and connect socket
let socket = io();
```
```
//Listen for confirmation of connection
socket.on('connect', () => {
  console.log("Connected");
});
```

- **STEP 5:**	Client-Side **‘Emit’** Event - What does a client send to the server? Use p5!
```
function mouseMoved() {
  //Grab mouse position
  let mousePos = { x: mouseX, y: mouseY };
  //Send mouse position object to the server
  socket.emit('data', mousePos);

  //Draw yourself? or Wait for server?
  // fill(0);
  // ellipse(mouseX, mouseY 10, 10);
}
```

- **STEP 6:**	Server-Side **‘On’** Event - What does the server receive from a client?
```
//Listen for a message named 'data' from a client
socket.on('data', (data) => {
  //Data can be numbers, strings, objects
  console.log("Received 'data' msg");
  console.log(data);

  //Send the data back to the clients using .emit()

}
```

- **STEP 7:**	Server-Side **‘Emit’** Event - How does the server share updates with everyone?
```
//Send data to ALL clients, including this one
io.emit('data', data);

//Send data to ALL other clients, except for the sender
// socket.broadcast.emit('data', data);

//Send the data to just the sender
// socket.emit('data', data);
```

- **STEP 8:**	Client Side **‘On’** Event - What does everyone need to receive updates from the server?
```
//Listen for a message named 'data' from the server
socket.on('data', function(obj) {
  console.log(obj);
  drawPos(obj);
});
```
```
//Expects an object with x and y properties
function drawPos(pos) {
  fill(0);
  ellipse(pos.x, pos.y, 10, 10);
}
```

### Code Steps - BONUS
**STEP 9** Client Side - Add color to the data object emitted in `.mousemoved()``

**STEP 10** Client & Server Side - Add a socket event on `mousepressed()`