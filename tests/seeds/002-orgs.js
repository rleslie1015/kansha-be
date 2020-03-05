exports.seed = async function(knex) {
	await knex('Organizations').insert([
		{ name: 'Organization 1' },
		{ name: 'Organization 2' },
	]);
	return knex('Employees').insert([
		{ user_id: 1, org_id: 1, job_title: 'Job Title', user_type: 'admin' },
		{
			user_id: 2,
			org_id: 1,
			job_title: 'Job Title',
			user_type: 'standard',
		},
		{ user_id: 3, org_id: 2, job_title: 'Job Title', user_type: 'admin' },
		{
			user_id: 4,
			org_id: 2,
			job_title: 'Job Title',
			user_type: 'standard',
		},
	]);
};
