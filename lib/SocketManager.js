var sessionManager = require('./session/SessionManager');
var url            = require('url');

module.exports = function(io, params)
{
    io.on('connection', function(socket)
    {
        console.log("Socket connected! Total sockets: " + io.sockets.sockets.length);
        var parsedURL = url.parse(socket.handshake.headers.referer);

        if(parsedURL.pathname.split('/').join('') !== params.mobileRefPath)
        {
            createSession(socket, params.uidMaxNum);

        } else {

            socket.on('setChannel', setChannel);
            socket.on('control', onControl);
        }

        socket.on('disconnect', onDisconnect);

    });

}

function createSession(socket, sessionMaxNum)
{
    var session = sessionManager.create(socket.id, sessionMaxNum);
    socket.join(session);
    socket.session = session;
    socket.emit('message', {message: "connected", uid : session});
}

function setChannel(data)
{
    try {
        this.join(data.uid);
        this.session = data.uid;
        this.emit('message', {message: 'connected', uid: data.uid});
        this.broadcast.to(data.uid).emit('message', {message: 'device-connected', uid: data.uid});
    } catch(e){
        this.emit('message', {message: 'error'});
    }
}

function onControl(data)
{
    console.log('control:', data);
    this.broadcast.to(data.uid).emit('message', {message: "control-change", data: data.range});
}

function onDisconnect()
{
    sessionManager.kill(this.session);
}
