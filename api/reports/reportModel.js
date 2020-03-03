const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	oneDayDataForMyOrg,
	oneWeekDataForMyOrg,
	oneMonthDataForMyOrg,
	oneYearDataForMyOrg,
};

async function oneDayDataForMyOrg(org_id) {
	let { count } = await db('Recognition')
		.where({ org_id })
		.andWhere('date' < new Date(moment('YYYY-MM-DD')))
		.count()
		.first();
	count = Number(count);

	return count;
}

async function oneWeekDataForMyOrg(org_id) {
	let { count } = await db('Recognition')
		.where({ org_id })
		.andWhere(
			'date' <
				new Date(
					moment()
						.subtract(7, 'days')
						.calendar(),
				),
		)
		.count()
		.first();
	count = Number(count);

	return count;
}

async function oneMonthDataForMyOrg(org_id) {
	let { count } = await db('Recognition')
		.where({ org_id })
		.andWhere('date' < new Date(moment('YYYY-MM')))
		.count()
		.first();
	count = Number(count);

	return count;
}

async function oneYearDataForMyOrg(org_id) {
	let { count } = await db('Recognition')
		.where({ org_id })
		.andWhere('date' < new Date(moment('YYYY')))
		.count()
		.first();
	count = Number(count);

	return count;
}
