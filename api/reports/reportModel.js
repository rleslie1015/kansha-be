const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	dataForMyOrg,
	getTopEmployees,
	getTopGivers,
};

async function dataForMyOrg(org_id, query = {}) {
	const { time = '' } = query;

	if (!query) {
		let time = 'years';
	}

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

async function getTopEmployees(org_id, query = {}) {
	const { time = '' } = query;

	const topEmployees = await db('Recognition')
		.join('Users', 'Users.id', 'recipient')
		.select(
			'Users.first_name',
			'Users.last_name',
			'recipient',
			'Users.profile_picture',
		)
		.where({ org_id })
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		.count('recipient')
		.groupBy(
			'recipient',
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		.orderByRaw('COUNT(recipient) DESC');

	return topEmployees;
}

async function getTopGivers(org_id, query = {}) {
	const { time = '' } = query;

	const topGivers = await db('Recognition')
		.join('Users', 'Users.id', 'sender')
		.select(
			'Users.first_name',
			'Users.last_name',
			'sender',
			'Users.profile_picture',
		)
		.where({ org_id })
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		.count('sender')
		.groupBy(
			'sender',
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		.orderByRaw('COUNT(sender) DESC');

	return topGivers;
}
