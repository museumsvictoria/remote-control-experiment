var express = require('express');
var http = require('http');
var path = require('path');
let socketio = require('socket.io');

var app = express();
var port = 8100;

var server = http.Server(app);

let io = socketio(server);

io.on('connection', (socket) => {
    console.log('Client ' + socket.id + ' connected');

    socket.on('disconnect', function() {
        console.log('Client ' + socket.id + ' disconnected');
    });

    socket.on('remote-orientation-message', (orientation) => {
        io.emit('remote-orientation-message', orientation);
    });

    socket.on('remote-orientation-connection-status', (status) => {
        io.emit('remote-orientation-connection-status', status);
    });
});

server.listen(port, () => {
    console.log('SocketIO listening on port ' + port);
});