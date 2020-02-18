exports.seed = async function(knex) {
	const users = await knex('Users');

	const insertArray = users.map(async user => {
		let org = await knex('Organizations')
			.where({ name: user.org_name })
			.first();
		if (!org) {
			org = await knex('Organizations').insert({ name: user.org_name });
		}
		return knex('Employees').insert({
			user_id: user.id,
			org_id: org.id,
			job_title: user.job_title,
			user_type: user.user_type,
		});
	});

	return Promise.all(insertArray);
};
