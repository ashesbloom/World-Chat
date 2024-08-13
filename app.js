require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');

const http = require('http');
const { Server } = require('socket.io');


const server = http.createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.static(path.resolve('./public')));


let onlineUser = [];

io.on('connection', (socket) => {
    onlineUser.push(socket.id);
    console.log(`Total online users: ${onlineUser.length}`);
    io.emit('total-user', onlineUser.length);

    socket.on('user-message', (message) => {
        // console.log('Message received: ', message);
        io.emit('backend-user-message', message, socket.id);
    });

    socket.on('disconnect', () => {
        onlineUser = onlineUser.filter(id => id !== socket.id);
        io.emit('total-user', onlineUser.length);
        console.log('disconnected');
    });
});


//express routes
app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});


//listing to server
server.listen(PORT, () => {
    console.log('\nServer is live on: ' + PORT);
})