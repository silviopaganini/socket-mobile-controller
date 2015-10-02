# Socket mobile controller

[![npm version](https://badge.fury.io/js/socket-mobile-controller.svg)](http://badge.fury.io/js/socket-mobile-controller)

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

## Docker + supervisord + AWS Elastic Beanstalk

### Setup your Docker environment 

Make sure you change the following variables inside the `Makefile`

* IMAGE_NAME
* CONTAINER_NAME

### Supervisord

Change the paths to your folders and server script on `devops/supervisord.conf`

### Dockerfile

Check the `Dockerfile` for any changes in folder names or files that you want to include / remove

### Ready?

Once you're ready, you can just run 

```bash
make docker
```

