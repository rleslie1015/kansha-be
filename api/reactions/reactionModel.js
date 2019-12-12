const db = require('../../data/dbConfig');

function getReactions(rec_id) {
	return db
		.select('u.first_name', 'u.last_name', 'r.user_id')
		.from('Reactions as r')
		.where('r.rec_id', '=',  rec_id )
		.join('Users as u', 'r.user_id', '=', 'u.id');
}

function addEvent(type, data) {
	db(type)
		.insert(data)
		.returning('*');
}

function deleteEvent(type, id) {
	db(type)
		.where({ id })
		.del();
}

function getComments(rec_id) {
	return db
		.select(
			'u.first_name',
			'u.last_name',
			'c.user_id',
			'c.message',
		)
		.from('Comments as c')
		.where('c.rec_id', '=',  rec_id )
		.join('Users as u', 'c.user_id', '=', 'u.id');
}

module.exports = { getComments, getReactions, deleteEvent, addEvent };
