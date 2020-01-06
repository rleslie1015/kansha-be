const db = require('../../data/dbConfig');

const getUserInteractions = id => {
	return db
		.select([
			'rec.*',
			'r.first_name as first_name',
			'r.last_name as last_name',
			'r.profile_picture as profile_pic',
		])
		.from('Recognition as rec')
		.where('sender', '=', id)
		.join('Users as s', 'rec.sender', '=', 's.id')
		.join('Users as r', 'rec.recipient', '=', 'r.id')
		.union([
			db
				.select([
					'rec.*',
					's.first_name as first_name',
					's.last_name as last_name',
					's.profile_picture as profile_pic',
				])
				.from('Recognition as rec')
				.where('recipient', '=', id)
				.join('Users as s', 'rec.sender', '=', 's.id')
				.join('Users as r', 'rec.recipient', '=', 'r.id'),
		])
		.orderBy('date');
};

const findProfile = filter => {
	return db('Users')
		.where(filter)
		.limit(1);
};

module.exports = { getUserInteractions, findProfile };
