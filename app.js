/**
 * crematory SERVICE FILESYSTEM WATCHER - WINDOWS
 */



'use strict';


const fs = require('fs');
const os = require('os');
const path = require('path');
const PKG = require('./package.json')
const mkdirp = require('mkdirp');
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var config = {};

/**
 * [missing_config description]
 * @method missing_config
 * @param  {[type]}       msg [description]
 * @return {[type]}           [description]
 */
const exit = function(msg){
    console.log('[err]', msg);
    process.exit(true);
}

try{
    config = PKG.crematory_service || exit('Please add "crematory_service" section in package.json');
}catch(e){
    exit('Please add "crematory_service" section in package.json');
}

config.home_dir = path.join(os.homedir())
config.target = path.join(os.homedir(), config.target) || exit('Please add "target" for "crematory_service" in package.json');
config.port = config.port || '3000';
config.host = config.host || '127.0.0.1'


console.log('[info]','target location:', config.target);

if (os.type().toLowerCase() != 'Windows'.toLowerCase() ){
    console.log('[warrning]','Service is write for Windows! Maybe not work correctly here');
}

fs.access(config.target, fs.constants.R_OK, function(err){
    if(err) {
        mkdirp(config.target, function (err) {
            if (err) exit('No access to target location.')
            else console.log('[Info]','target folder initialize.')
            init()
        });
    }else{
        init()
    }
})




function init(){


    app.get('/', function(req, res){
      res.sendFile(path.join(path.parse(process.mainModule.filename).dir, '/view/index.html'));
    });

    io.on('connection', function(socket){
      console.log('a client connected');
    });

    http.listen(33333,'127.0.0.1', function(){

      console.log('[Info]','listening on *:33333');

      fs.watch(config.target, {
           recursive:true
      }, function(eventType, filename){
          console.log('[ON]', eventType, filename);
          io.emit('file_change', { for: 'everyone', eventType:eventType, filename:filename });
      })
    });
}
