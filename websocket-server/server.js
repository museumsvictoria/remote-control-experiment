'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('CLIENT CONNECTED');

    socket.on('disconnect', function() {
        console.log('CLIENT DISCONNECTED');
    });

    socket.on('remote-orientation-message', (orientation) => {
        io.emit('remote-orientation-message', orientation);
    });

    socket.on('remote-orientation-connection-status', (status) => {
        console.log('remote-orientation-connection-status: ' + status);
        io.emit('remote-orientation-connection-status', status);
    });
});

http.listen(8100, () => {
    console.log('started on port 8100');
});