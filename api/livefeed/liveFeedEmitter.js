const { EventEmitter } = require('events')
const { getRecognition } = require('./liveFeedModel')



const feedEmitter = new EventEmitter().setMaxListeners(50);

feedEmitter.addListener('newRecognition', ([form]) => {
    getRecognition(form.id)
        .then(([rec]) => feedEmitter.emit(`recognition-${rec.org_name}`, [rec]))
})

feedEmitter.addListener('newComments', (comments) => {
     feedEmitter.emit(`comments-${rec.org_name}`, comments)
})

module.exports = { feedEmitter }