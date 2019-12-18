const { EventEmitter } = require('events');

const emitterInput = (new EventEmitter).setMaxListeners(5);
const emitterOutput = (new EventEmitter).setMaxListeners(100);

emitterInput.addListener('event', ({ org_name, payload, type }) => {
	emitterOutput.emit(org_name, { type, payload });
});

module.exports = { emitterInput, emitterOutput };
