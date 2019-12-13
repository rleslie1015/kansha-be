const { EventEmitter } = require('events');
const { getRecognition } = require('./liveFeedModel');
const { getReaction, getComment } = require('../reactions/reactionModel');

const feedEmitter = new EventEmitter().setMaxListeners(50);

feedEmitter.addListener('newRecognition', ([form]) => {
	getRecognition(form.id).then(([rec]) =>
		feedEmitter.emit(`recognition-${rec.org_name}`, [rec]),
	);
});

feedEmitter.addListener('newComments', ([comment]) => {
	getComment(comment.id).then(([comment]) =>
		feedEmitter.emit(`comment-${comment.org_name}`, comment),
	);
});

feedEmitter.addListener('newReactions', ([reaction]) => {
	getReaction(reaction.id).then(([reaction]) =>
		feedEmitter.emit(`reaction-${reaction.org_name}`, reaction),
	);
});

module.exports = { feedEmitter };
