const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	getDataForMyOrg,
	getPercentThanked,
	getRangeOfDataForMyOrg,
	getTops,
};

async function getRangeOfDataForMyOrg(org_id, query = {}) {
	let { time = 'years' } = query;
	const recognitions = await db('Recognition')
		.where({ org_id })
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.startOf(time)
				.toDate(),
		)
		.count();

	const results = {};
	let count = 0;

	for (const rec of recognitions) {
		let period;
		if (time === 'years') {
			period = moment(rec.date).format('MMMM');
		} else if (time === 'months') {
			period = moment(rec.date).format('w');
		} else if (time === 'weeks') {
			period = moment(rec.date).format('dddd');
		}

		if (!results[period]) results[period] = 1;
		else results[period]++;
		count++;
	}

	console.log({ count, results });

	return { count, results };
}

async function getDataForMyOrg(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = 'years' } = query;
	// if there is no query in the url, set the time to years
	// get the number of recognitions in the Recognition table
	let { count } = await db('Recognition')
		// inside of this organization
		.where({ org_id })
		// that match the query
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)

		.count()
		.first();
	//convert the count from a string like "3" to a number like 3
	count = Number(count);

	return count;
}

async function getTops(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = 'years', type = 'sender', limit = '5' } = query;
	// if there is no query in the url, set the time to years

	const employees = await db('Recognition')
		// getting their names and picture from the users table
		.join('Users', 'Users.id', type)
		.select(
			'Users.first_name',
			'Users.last_name',
			type,
			'Users.profile_picture',
		)
		// limiting the people to the current organizatoin
		.where({ org_id })
		// limiting it to those within the query
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		// getting the count of how many times the person has received something
		.count(type)
		// grouping them by their id and other info
		.groupBy(
			type,
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		//ordering them from most received to least
		.orderByRaw(`COUNT(${type}) DESC`)
		.limit(limit);

	const count = employees.reduce((acc, cur) => acc + Number(cur.count), 0);

	return { count, employees };
}

async function getPercentThanked(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = 'years' } = query;
	// if there is no query in the url, set the time to years

	//get the number of people thanked
	let numberOfPeopleThanked = await db('Recognition')
		//in this org
		.where({ org_id })
		// who match the query
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		.distinct('recipient');
	// changing the number from a string to an integer
	numberOfPeopleThanked = numberOfPeopleThanked.length;
	// get the number of people in org
	let numberOfPeopleInOrg = await db('Employees')
		.where({
			org_id,
		})
		.count('user_id')
		.first();
	numberOfPeopleInOrg = Number(numberOfPeopleInOrg.count);
	// get the percent up to two decimal points
	let percentThanked =
		Math.round((numberOfPeopleThanked / numberOfPeopleInOrg) * 100 * 100) /
		100;

	//return all three numbers

	return {
		numberOfPeopleThanked,
		numberOfPeopleInOrg,
		percentThanked,
	};
}
