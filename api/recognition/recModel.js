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
			'rec.id',
			'rec.sender',
			'rec.recipient',
			'rec.message',
			'rec.date',
			'r.first_name as first_name',
            'r.last_name as last_name',
            'r.profile_picture as profile_pic'
		])
		.from('Recognition as rec')
		.where('sender', '=', id)
		.join('Users as s', 'rec.sender', '=', 's.id')
		.join('Users as r', 'rec.recipient', '=', 'r.id')
		.union([
			db
				.select([
					'rec.id',
					'rec.sender',
					'rec.recipient',
					'rec.message',
					'rec.date',
					's.first_name as first_name',
					's.last_name as last_name',
                    's.profile_picture as profile_pic'
				])
				.from('Recognition as rec')
				.where('recipient', '=', id)
				.join('Users as s', 'rec.sender', '=', 's.id')
				.join('Users as r', 'rec.recipient', '=', 'r.id'),
		])
		.orderBy('date');
}
