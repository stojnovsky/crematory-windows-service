/**
 * JORO SERVICE FILESYSTEM WATCHER - WINDOWS
 */



'use strict';


const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');
const PKG = require('./package.json')


/**
 * [missing_config description]
 * @method missing_config
 * @param  {[type]}       msg [description]
 * @return {[type]}           [description]
 */
const missing_config = function(msg){
    console.log(msg);
    process.exit(true);
}

try{
    var config = PKG.joro_config
}catch(e){
    missing_config('Please add "joro_service" section in package.json');
}


config.home_dir = path.join(os.homedir())
config.target = path.join(os.homedir(), config.target) || missing_config('Please add "target" for "joro_service" in package.json');

if (os.type().toLowerCase() != 'Windows'.toLowerCase() ){
    console.log('[warrning]','Service is write for Windows! Maybe not work correctly here');
}

fs.access(config.target, fs.constants.R_OK, function(err){

})



var app = express();



fs.watch(config.target, {
    recursive:true
}, function(eventType, filename){
    console.log('[ON]', eventType, filename);
})
