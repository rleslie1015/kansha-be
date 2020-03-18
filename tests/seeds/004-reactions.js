exports.seed = function(knex) {
	return knex('Reactions').insert([
		{ user_id: 1, rec_id: 1, date: '2020-03-01T00:00:00.000Z' },
		{ user_id: 2, rec_id: 2, date: '2020-03-01T00:00:00.000Z' },
		{ user_id: 3, rec_id: 3, date: '2020-03-01T00:00:00.000Z' },
	]);
};
