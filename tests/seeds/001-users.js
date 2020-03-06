exports.seed = function(knex) {
	return knex('Users').insert([
		{
			sub: '1',
			first_name: 'Test',
			last_name: 'User 1',
			department: 'X',
			email: 'test.user1@kansharewards.com',
		},
		{
			sub: '2',
			first_name: 'Test',
			last_name: 'User 2',
			department: 'X',
			email: 'test.user2@kansharewards.com',
		},
		{
			sub: '3',
			first_name: 'Test',
			last_name: 'User 3',
			department: 'X',
			email: 'test.user3@kansharewards.com',
		},
		{
			sub: '4',
			first_name: 'Test',
			last_name: 'User 4',
			department: 'X',
			email: 'test.user3@kansharewards.com',
		},
	]);
};
