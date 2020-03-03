const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	dataForMyOrg,
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
