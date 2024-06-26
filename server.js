const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    });
    const interval = setInterval(() => {
        io.emit('chat message', { username: "Server", message: "Day la tin nhan Server", time: "currentTime" });
    }, 1000);
});

server.listen(3010, () => {
    console.log('Server is running on port 3010');
});
