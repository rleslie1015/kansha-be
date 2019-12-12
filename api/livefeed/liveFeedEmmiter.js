const { EventEmitter }= require('events')

module.exports.feedEmmiter = (new EventEmitter().setMaxListeners(50));