'use strict';

var generateSession = require('./generate-session');

var SessionManager =
{
    activeSessions : {},

    create: function( deviceUID, sessionMaxNum )
    {
        var session = generateSession( sessionMaxNum );
        if(this.activeSessions[session] != null){
            this.create(deviceUID, sessionMaxNum);
        } else {
            this.activeSessions[session] = deviceUID;
            return session;
        }
    },

    kill : function(session){
        this.activeSessions[session] = null;
        delete this.activeSessions[session];
        console.log("Disconnected from: ", session);
    }
};

module.exports = SessionManager;
