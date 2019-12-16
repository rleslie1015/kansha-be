const { EventEmitter } = require('events');

const emitterInput = new EventEmitter(5);
const emitterOutput = new EventEmitter(100);

emitterInput.addListener('event', ({ org_name, payload, type }) => {
	emitterOutput.emit(org_name, { type, payload });
});

module.exports = { emitterInput, emitterOutput };
