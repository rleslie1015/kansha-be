exports.seed = function(knex) {
	return knex('Recognition').insert([
		{
			recipient: 1,
			sender: 2,
			message: 'Go forth and be a God',
			date: '2019/11/13',
		},
		{
			recipient: 2,
			sender: 3,
			message: 'Go forth and learn',
			date: '2019/11/13',
		},
		{
			recipient: 3,
			sender: 1,
			message: 'Go be a popcicle!',
			date: '2019/11/13',
		},
	]);
};
