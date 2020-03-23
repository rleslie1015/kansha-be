exports.seed = function(knex) {
	// Deletes ALL existing entries

	return knex('TeamMembers').insert([
		{
			id: 1,
			user_id: 1,
			team_id: 1,
			team_role: 'manager',
			active: 'true',
		},
		{
			id: 2,
			user_id: 2,
			team_id: 1,
			team_role: 'member',
			active: 'true',
		},
		{
			id: 3,
			user_id: 3,
			team_id: 2,
			team_role: 'manager',
			active: 'true',
		},
		{
			id: 4,
			user_id: 4,
			team_id: 2,
			team_role: 'member',
			active: 'true',
		},
	]);
};
