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
	const topEmployees = await db('Recognition')
		.where({ org_id })
		.select('recipient')
		.count('recipient')
		.groupBy('recipient')
		.orderByRaw('COUNT(recipient) DESC')
		.limit(3);

	return topEmployees;
}
/*
SELECT recipient, COUNT(recipient)
FROM Recognition
GROUP BY recipient
ORDER BY COUNT(recipient) DESC

*/
