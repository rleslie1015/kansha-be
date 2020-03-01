const db = require('../../data/dbConfig');

module.exports = {
	findAllEmployees,
	findEmployeeById,
	getEmployeesByOrg,
	addEmployee,
	deleteEmployee,
	editEmployee,
};

// find all employees
function findAllEmployees() {
	return db('Employees');
}
function findByEmail(email) {
	return db('Users')
		.where({ email })
		.select('id');
}
// find one employee
function findEmployeeById(id) {
	return db('Employees')
		.where({ id })
		.first();
}

// add an employee
async function addEmployee(employee) {
	const [id] = await db('Employees').insert(employee, 'id');

	return findEmployeeById(id);
}

// delete an employee
function deleteEmployee(id) {
	return db('Employees')
		.where({ id })
		.del();
}

// edit an employee
function editEmployee(id, changes) {
	return db('Employees')
		.where({ id })
		.update(changes)
		.then(count => (count > 0 ? findEmployeeById(id) : null));
}
// Get all employees by org id

async function getEmployeesByOrg(org_id, query = {}) {
	const {
		page = 1,
		limit = 20,
		sortby = 'id',
		sortdir = 'asc',
		search = '',
	} = query;
	const offset = limit * (page - 1);
	const employees = await db('Employees')
		.join('Users', 'Users.id', 'Employees.user_id')
		.join('Organizations', 'Organizations.id', 'Employees.org_id')
		.select(
			'Users.id',
			'first_name',
			'last_name',
			'profile_picture',
			'job_title',
			'user_type',
			'department',
			'Organizations.name as org_name',
		)
		.where({ org_id })
		.andWhere(builder => {
			builder
				.where('first_name', 'ilike', `%${search}%`)
				.orWhere('last_name', 'ilike', `%${search}%`);
		})
		.orderBy(sortby, sortdir)
		.limit(limit)
		.offset(offset);

	let { count } = await db('Employees')
		.where({ org_id })
		.count()
		.first();
	count = Number(count);

	return {
		count,
		employees,
	};
}
