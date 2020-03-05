exports.seed = async function(knex) {
	await knex('Badges').insert([
		{
			badge_name: 'badge_name1',
			badge_URL: 'http://fake.url',
		},
		{
			badge_name: 'badge_name2',
			badge_URL: 'http://fake.url',
		},
	]);
	return knex('Recognition').insert([
		{
			recipient: 1,
			sender: 2,
			message: 'Sample Message',
			date: '2020/03/01',
		},
		{
			recipient: 2,
			sender: 1,
			message: 'Sample Message',
			date: '2020/03/01',
		},
		{
			recipient: 3,
			sender: 4,
			message: 'Sample Message',
			date: '2020/03/01',
		},
		{
			recipient: 4,
			sender: 3,
			message: 'Sample Message',
			date: '2020/03/01',
		},
	]);
};
