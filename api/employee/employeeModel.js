const db = require('../../data/dbConfig');

module.exports = {
	findAllEmployees,
	findEmployeeById,
	addEmployee,
	deleteEmployee,
	editEmployee,
};

// find all employees
function findAllEmployees() {
	return db('Employees').select('id', 'name');
}

// find one employee
function findEmployeeById(id) {
	return db('Employees').where({ id });
}

// add an employee
async function addEmployee(employee) {
	const [id] = await db('Employees').insert(employee);

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
