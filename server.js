const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.use(express.static('public'));

const PORT = process.env.PORT || 8000


// handle socket connection
io.on('connection', (socket)=>{
    console.log('A user is connected')


    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})


// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});