exports.seed = function(knex) {
	return knex('Teams').insert([
		{
			name: 'Team One',
			org_id: 1,
		},
		{
			org_id: 1,
			name: 'Team Two',
		},
	]);
};
