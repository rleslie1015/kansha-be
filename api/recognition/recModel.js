const db = require('../../data/dbConfig');

module.exports = {
	findAll,
	findById,
	deleteRec,
	editRec,
	addRec,
	getUserInteractions,
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

function addRec(obj, id) {
	return db('Recognition')
		.insert(obj)
		.then(() => {
			findAll();
		});
}

function getUserInteractions(id) {
	return db
		.select([
			'rec.message',
			'rec.date',
			's.first_name as sender_first_name',
			's.last_name as sender_last_name',
			'r.first_name as recipient_first_name',
			'r.last_name as recipient_last_name',
		])
		.from('Recognition as rec')
		.where('sender', '=', id)
		.join('Users as s', 'rec.sender', '=', 's.id')
		.join('Users as r', 'rec.recipient', '=', 'r.id')
		.union([
			db
				.select([
					'rec.message',
					'rec.date',
					's.first_name as sender_first_name',
					's.last_name as sender_last_name',
					'r.first_name as recipient_first_name',
					'r.last_name as recipient_last_name',
				])
				.from('Recognition as rec')
				.where('recipient', '=', id)
				.join('Users as s', 'rec.sender', '=', 's.id')
				.join('Users as r', 'rec.recipient', '=', 'r.id'),
        ])
        .orderBy('date');
}
