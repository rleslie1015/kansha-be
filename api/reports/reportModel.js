const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	dataForMyOrg,
	getTopEmployees,
};

async function dataForMyOrg(org_id, query = {}) {
	const { time = '' } = query;

	let { count } = await db('Recognition')
		.where({ org_id })
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)

		.count()
		.first();
	count = Number(count);

	return count;
}

async function getTopEmployees(org_id) {
	const employees = await db('Recognition')
		.join('Users', 'Users.id', 'Recognition.recipient')
		.select(
			'Users.id',
			'first_name',
			'last_name',
			'profile_picture',
			'COUNT() as received',
		)
		.where({ org_id });

	// right now i have a list of all the employees who have received gifts.
	//I need to count how many gifts each person has received
}
