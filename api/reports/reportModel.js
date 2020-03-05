const db = require('../../data/dbConfig');
const moment = require('moment');

module.exports = {
	getDataForMyOrg,
	getTopEmployees,
	getTopGivers,
	getPercentThanked,
};

async function getDataForMyOrg(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = '' } = query;
	// if there is no query in the url, set the time to years
	if (!query) {
		time = 'years';
	}
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

async function getTopEmployees(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = '' } = query;
	// if there is no query in the url, set the time to years
	if (!query) {
		time = 'years';
	}
	// get the people who have received thanks from the Recognition table
	const topEmployees = await db('Recognition')
		// getting their names and picture from the users table
		.join('Users', 'Users.id', 'recipient')
		.select(
			'Users.first_name',
			'Users.last_name',
			'recipient',
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
		.count('recipient')
		// grouping them by their id and other info
		.groupBy(
			'recipient',
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		//ordering them from most received to least
		.orderByRaw('COUNT(recipient) DESC');

	return topEmployees;
}

async function getTopGivers(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = '' } = query;

	// if there is no query in the url, set the time to years
	if (!query) {
		time = 'years';
	}
	// Retrieving the top givers in an organization from the Recognition table
	const topGivers = await db('Recognition')
		.join('Users', 'Users.id', 'sender')
		.select(
			'Users.first_name',
			'Users.last_name',
			'sender',
			'Users.profile_picture',
		)
		// Grabbing only the data that matches the org_id of the current logged in user
		.where({ org_id })
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		// Getting the number of times the person has sent a recognition
		.count('sender')
		// Grouping each result by the following information below
		.groupBy(
			'sender',
			'Users.first_name',
			'Users.last_name',
			'Users.profile_picture',
		)
		// Ordering from most recognitions sent, to least recognitions sent
		.orderByRaw('COUNT(sender) DESC');

	return topGivers;
}

async function getPercentThanked(org_id, query = {}) {
	// retrieving the time period from the query, either days, weeks, months, or years
	const { time = '' } = query;
	// if there is no query in the url, set the time to years
	if (!query) {
		time = 'years';
	}
	//get the number of people thanked
	let numberOfPeopleThanked = await db('Recognition')
		//in this org
		.where({
			org_id,
		})
		// who match the query
		.andWhere(
			'date',
			'>',
			moment()
				.subtract(1, time)
				.toDate(),
		)
		.count('recipient')
		.first();
	// changing the number from a string to an integer
	numberOfPeopleThanked = Number(numberOfPeopleThanked.count);
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
