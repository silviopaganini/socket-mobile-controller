# Socket mobile controller

## Usage

```bash
$ npm install socket-mobile-controller --save-dev
```

### Server

```js
var express = require('express');
var app     = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);

var socketManager = require('./lib/SocketManager')(io, {
    uidMaxNum     : 4, 
    mobileRefPath : 'mobile'
});

/*
- uidMaxNum // max number of sessions, ie. 9999
- mobileRefPath // pathname to distinguish between desktop and mobile
*/
```

### Client
```html
<script src="/socket.io/socket.io.js"></script>
```
```js
var socket = io.connect('http://localhost:3333');

socket.on('connect', onConnect);
socket.on('message', onMessage);
socket.on('disconnect', onDisconnect);

function onMessage(e)
{
	switch(e.message)
	{
		case "connected":
			this.socket.UID = e.uid;
			break;

      	case "device-connected":
			console.log(e);
			break;

       case 'control-change':
			console.log('control-change:', e);
			break;
	}
}
```
Full example on `dist` folder