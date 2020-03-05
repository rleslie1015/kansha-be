exports.seed = function(knex) {
	return knex('Badges').insert([
		{
			id: 1,
			badge_name: 'over_achiever',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Over+Achiever.png',
		},
		{
			id: 2,
			badge_name: 'problem_solver',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Problem+Solver.png',
		},
		{
			id: 3,
			badge_name: 'team_leader',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Team+Leader.png',
		},
		{
			id: 4,
			badge_name: 'mvp',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/MVP.png',
		},
		{
			id: 5,
			badge_name: 'helping_hand',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Helping+Hand.png',
		},
		{
			id: 6,
			badge_name: 'all_day',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/All+Day+Everyday.png',
		},
		{
			id: 7,
			badge_name: 'jupiter',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Jupiter+recognize!.png',
		},
		{
			id: 8,
			badge_name: 'class_clown',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Class+Clown.png',
		},
		{
			id: 9,
			badge_name: 'high_five',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/High+Five.png',
		},
		{
			id: 10,
			badge_name: 'jedi_master',
			badge_URL:
				'https://kansha-bucket.s3-us-west-1.amazonaws.com/Jedi+Master.png',
		},
	]);
};
