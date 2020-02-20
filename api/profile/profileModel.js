const db = require('../../data/dbConfig');

const getUserInteractions = id => {
	return db('Recognition as rec')
		.join('Users as s', 'rec.sender', '=', 's.id')
		.join('Users as r', 'rec.recipient', '=', 'r.id')
		.where({ sender: id })
		.orWhere({ recipient: id })
		.select(
			'rec.*',
			'r.first_name as first_name',
			'r.last_name as last_name',
			'r.profile_picture as profile_pic',
		)
		.orderBy('date');
};

const findProfile = filter => {
	return db('Users')
		.where(filter)
		.limit(1);
};

module.exports = { getUserInteractions, findProfile };
