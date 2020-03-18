exports.seed = function(knex) {
	return knex('Comments').insert([
		{
			user_id: 1,
			rec_id: 1,
			message: 'this is a message',
			date: '2020-03-01T00:00:00.000Z',
		},
		{
			user_id: 2,
			rec_id: 2,
			message: 'this is a message',
			date: '2020-03-01T00:00:00.000Z',
		},
		{
			user_id: 3,
			rec_id: 2,
			message: 'this is a message',
			date: '2020-03-01T00:00:00.000Z',
		},
		{
			user_id: 2,
			rec_id: 1,
			message: 'this is a message',
			date: '2020-03-01T00:00:00.000Z',
		},
	]);
};
