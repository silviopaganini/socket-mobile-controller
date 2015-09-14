// node modules
var express = require('express');
const app   = express();
var http    = require('http').Server(app);
var path    = require('path');
var io      = require('socket.io')(http);

// const vars
const PORT        = 3333;
const DIST_FOLDER = path.resolve(__dirname + "/dist/");
const ROUTES      = ['/', '/mobile'];
//

// EXPRESS

app.use(express.static( DIST_FOLDER ));

app.get( ROUTES , function(req, res){
    res.sendFile(DIST_FOLDER + '/index.html');
});

// SERVER LISTEN

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

// SOCKET-IO

var socketManager = require('./lib/SocketManager')(io, {
    uidMaxNum     : 4,
    mobileRefPath : 'mobile'
});
