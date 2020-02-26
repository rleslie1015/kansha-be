const db = require('../../data/dbConfig');

module.exports = {
	findAll,
	findById,
	findByEmail,
	addUser,
	deleteUser,
	editUser,
	editUserBySub,
	find,
	addNewUser,
};
//tested in userRouter, works
function findAll() {
	return db('Users')
		.join('Employees', 'Users.id', 'Employees.user_id')
		.join('Organizations', 'Employees.org_id', 'Organizations.id')
		.select(
			'Users.*',
			'Employees.job_title',
			'Employees.user_type',
			'Organizations.id as org_id',
			'Organizations.name as org_name',
		);
}
//tested in userRouter, works
function findById(id) {
	return findAll().where({ 'Users.id': id });
}

// needed in employee router

function findByEmail(email) {
	return db('Users')
		.where({ email })
		.select('id');
}

// need to migrate for email
async function addUser(newUser) {
	const {
		org_name,
		first_name,
		last_name,
		job_title,
		user_type,
		email,
		profile_picture,
		sub,
		department,
	} = newUser;
	const [org] = await db('Organizations').insert({ name: org_name }, 'id');
	const [user] = await db('Users').insert(
		{
			first_name,
			last_name,
			department,
			profile_picture,
			sub,
		},
		'id',
	);

	await db('Employees').insert({
		org_id: org,
		user_id: user,
		job_title,
		user_type,
	});
	return [user];
}

async function addNewUser(newUser) {
	const {
		first_name,
		last_name,
		email,
		department,
		sub = 'no-auth',
		profile_picture,
	} = newUser;
	console.log(newUser, 'newUser');
	return db('Users').insert(
		{
			first_name,
			last_name,
			email,
			department,
			sub,
			profile_picture,
		},
		'id',
	);
}

async function deleteUser(id) {
	await db('Employees')
		.where({ user_id: id })
		.del();
	return db('Users')
		.where({ id })
		.del();
}
//tested in userRouter, works
async function editUser(id, changes) {
	const {
		first_name,
		last_name,
		job_title,
		user_type,
		email,
		profile_picture,
	} = changes;
	if (job_title || user_type) {
		await db('Employees')
			.where({ user_id: id })
			.update({ job_title, user_type });
	}
	if (first_name || last_name || email || profile_picture) {
		await db('Users')
			.where({ id })
			.update({ first_name, last_name, email, profile_picture });
	}
	return findById(id);
}

function editUserBySub(sub, changes) {
	return db('Users')
		.where({ sub })
		.update(changes);
}

//not currently used in userRouter fwiw ¯\_(ツ)_/¯
function find(filter) {
	return findAll().where(filter);
}
