var express = require('express');
var http = require('http');
var path = require('path');

var port = process.env.PORT || 4200;

var app = express();
app.use(express.static(__dirname));
var server = http.Server(app);

server.listen(port, () => {
    console.log('Web application listening on port ' + port);
});