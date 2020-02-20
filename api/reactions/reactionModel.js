const db = require('../../data/dbConfig');

function getReactions(rec_id) {
	return db
		.select(
			'u.first_name',
			'u.last_name',
			'r.user_id',
			'r.id',
			'u.profile_picture',
		)
		.from('Reactions as r')
		.where('r.rec_id', '=', rec_id)
		.join('Users as u', 'r.user_id', '=', 'u.id');
}
//needs refactoring
function getReaction(id) {
	return db('Reactions as r')
		.join('Users as u', 'r.user_id', 'u.id')
		.join('Employees as e', 'u.id', 'e.user_id')
		.join('Organizations as o', 'e.org_id', 'o.id')
		.where('r.id', '=', id)
		.select(
			'u.first_name',
			'u.last_name',
			'r.*',
			'o.name',
			'o.id as org_id',
			'u.profile_picture',
		);
}

function addReaction(data) {
	return db('Reactions')
		.insert(data)
		.returning('*')
		.then(([reaction]) => getReaction(reaction.id));
}
function addComment(data) {
	return db('Comments')
		.insert(data)
		.returning('*')
		.then(([comment]) => getComment(comment.id));
}

function deleteEvent(type, id) {
	return db(type)
		.where({ id })
		.del();
}

function getComments(rec_id) {
	return db
		.select('u.first_name', 'u.last_name', 'c.*', 'u.profile_picture')
		.from('Comments as c')
		.where('c.rec_id', '=', rec_id)
		.join('Users as u', 'c.user_id', '=', 'u.id');
}

function getComment(id) {
	return db('Comments as c')
		.join('Users as u', 'c.user_id', 'u.id')
		.join('Employees as e', 'u.id', 'e.user_id')
		.join('Organizations as o', 'e.org_id', 'o.id')
		.where('c.id', '=', id)
		.select(
			'u.first_name',
			'u.last_name',
			'c.*',
			'o.name',
			'o.id as org_id',
			'u.profile_picture',
		)
		.orderBy('date');
	// return db
	// 	.select(
	// 		'u.first_name',
	// 		'u.last_name',
	// 		'c.*',
	// 		'u.org_name',
	// 		'u.profile_picture',
	// 	)
	// 	.from('Comments as c')
	// 	.where('c.id', '=', id)
	// 	.join('Users as u', 'c.user_id', '=', 'u.id')
	// 	.orderBy('date');
}

module.exports = {
	getComments,
	getReactions,
	deleteEvent,
	getReaction,
	getComment,
	addReaction,
	addComment,
};
