exports.seed = async function(knex) {
	try {
		const users = await knex('Users');

		for await (user of users) {
			await knex('Users')
				.where({ id: user.id })
				.update({ department: 'Team Awesome' });
		}
	} catch (err) {
		console.log(err);
	}
};
