const express = require('express');
const app = express();

const path = require('path');

const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server)
const PORT = 8000;

//Middleware
app.use(express.static(path.resolve('./public')));

//socket.io routes(upgraded)
io.on()



//express routes
app.get('/',(req,res)=>{
    res.sendFile('./public/index.html');
});


//listing to server
server.listen(PORT,()=>{
    console.log('\nServer is live on:' + PORT);
})