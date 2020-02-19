exports.seed = async function(knex) {
	try {
		const users = await knex('Users');

		const insertArray = [];

		for await (user of users) {
			let org = await knex('Organizations')
				.where({ name: user.org_name })
				.first();
			if (org === undefined) {
				[org] = await knex('Organizations')
					.insert({ name: user.org_name })
					.returning(['id', 'name']);
			}
			insertArray.push({
				user_id: user.id,
				org_id: org.id,
				job_title: user.job_title,
				user_type: user.user_type,
			});
		}

		return knex('Employees').insert(insertArray);
	} catch (err) {
		console.log(err);
	}
};
