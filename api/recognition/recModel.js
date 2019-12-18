const db = require('../../data/dbConfig');

module.exports = {
	findAll,
	findById,
	deleteRec,
	editRec,
	addRec,
	getRecognition
};

function findAll() {
	return db('Recognition');
}

function findById(id) {
	return db('Recognition').where({ id });
}

function deleteRec(id) {
	return db('Recognition')
		.where({ id })
		.del();
}

function editRec(id, changes) {
	return db('Recognition')
		.where({ id })
		.update(changes);
}

function addRec(obj) {
	return db('Recognition')
		.insert(obj)
		.returning('*')
		.then(([rec]) => getRecognition(rec.id))
}

function getRecognition(id) {
	return db
		.select(
			's.*',
			'i.*',
			'r.last_name as recipient_last',
			'r.first_name as recipient_first',
		)
		.from('Recognition as i')
		.join('Users as s', 'i.sender', '=', 's.id')
		.join('Users as r', 'i.recipient', '=', 'r.id')
		.where('i.id', '=', id);
}