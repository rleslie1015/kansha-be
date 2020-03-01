exports.seed = async function(knex) {
	try {
		const recognitions = await knex('Recognition');

		for await (recognition of recognitions) {
			let employees = await knex('Employees')
				.where({ user_id: recognition.sender })
				.first();

			const { org_id } = employees;

			await knex('Recognition')
				.where({ id: recognition.id })
				.update({ org_id });
		}
	} catch (err) {
		console.log(err);
	}
};
