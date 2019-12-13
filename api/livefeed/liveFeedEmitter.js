const { EventEmitter } = require('events');
const { getRecognition } = require('./liveFeedModel');
const { getREactio, getComment } = require('../reactions/reactionModel');

const feedEmitter = new EventEmitter().setMaxListeners(50);

feedEmitter.addListener('newRecognition', ([form]) => {
	getRecognition(form.id).then(([rec]) =>
		feedEmitter.emit(`recognition-${rec.org_name}`, [rec]),
	);
});

feedEmitter.addListener('newComments', ([comment]) => {
	getComment(comment.id).then(([comment]) =>
		feedEmitter.emit(`recognition-${comment.org_name}`, [comment]),
	);
});

feedEmitter.addListener('newRaactions', ([reaction]) => {
	getComment(reaction.id).then(([reaction]) =>
		feedEmitter.emit(`recognition-${reaction}`, [reaction]),
	);
});

module.exports = { feedEmitter };
