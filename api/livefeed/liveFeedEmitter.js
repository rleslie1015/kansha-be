const { EventEmitter } = require('events')
const { getRecognition } = require('./liveFeedModel')



const feedEmitter = new EventEmitter().setMaxListeners(50);

feedEmitter.addListener('newRecognition', ([rec]) => {
    getRecognition(rec.id)
        .then(data => feedEmitter.emit('recognition', data))
})

module.exports = { feedEmitter }