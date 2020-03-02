const router = require('express').Router();
const emp = require('./employeeModel.js');
const userModel = require('../user/userModel.js');

const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

// Get all employees from the database
router.get('/', (req, res) => {
	emp.findAllEmployees()
		.then(emp => {
			res.status(200).json(emp);
		})
		.catch(error => {
			res.status(500).json({
				error: 'Could not retrieve employees from the database',
			});
		});
});

// Endpoint to retrieve all employees belonging to a specific organization

router.get('/organizations', (req, res) => {
	const orgId = req.profile.org_id;

	emp.getEmployeesByOrg(orgId, req.query)
		.then(emp => {
			res.status(200).json(emp);
		})
		.catch(error => {
			console.log(error, 'error');
			res.status(500).json({
				error: 'Employee List could not be retrieved from the database',
			});
		});
});

// Retrieve a specific employee from the database

router.get('/:id', (req, res) => {
	const id = req.params.id;

	emp.findEmployeeById(id)
		.then(emp => {
			res.status(200).json(emp);
		})
		.catch(error => {
			res.status(500).json({
				error: 'Employee could not be retrieved from the database',
			});
		});
});

// Delete an employee

router.delete('/:id', validateEmployeeId, (req, res) => {
	const id = req.params.id;
	emp.deleteEmployee(id, req.profile.org_id)
		.then(emp => {
			res.sendStatus(204);
		})
		.catch(error => {
			console.log('error deleting employee', error);
			res.status(500).json({
				error: 'Error Deleting employee',
			});
		});
});

// Add an employee

router.post('/', async (req, res) => {
	const currentOrgId = req.profile.org_id;

	const {
		first_name,
		last_name,
		email,
		department,
		user_type,
		job_title,
	} = req.body;

	if (!first_name || !last_name || !email) {
		return res.status(400).json({
			message: 'You need to pass in first_name, last_name, and email',
		});
	}

	try {
		let [foundEmployee] = await userModel.findByEmail(email);
		let employeeId;
		if (foundEmployee) {
			let { id: employeeId } = foundEmployee;
		} else {
			[employeeId] = await userModel.addNewUser({
				first_name,
				last_name,
				email,
				department,
				sub: 'no-auth',
			});
		}
		const newEmployee = await emp.addEmployee({
			user_id: employeeId,
			org_id: currentOrgId,
			user_type,
			job_title,
		});
		return res.status(201).json(newEmployee);
	} catch (error) {
		console.log('error adding user', error);
		return res.status(500).json({ error: 'Error adding user' });
	}
});

// get the org id from the current user profile
// check if user exists
// if not create a new one
// create an employee on the employee table
// use the org id from the current user profile and the user id

// Edit an Employee
router.put('/:id', validateEmployeeId, (req, res) => {
	const id = req.params.id;
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Employee needs a name' });
	}
	const changes = req.body;
	emp.editEmployee(id, changes)
		.then(updatedEmployee => {
			res.status(200).json(updatedOrg);
		})
		.catch(error => {
			res.status(500).json({
				error: 'Failed to update the employee',
			});
		});
});

// Middleware

function validateEmployeeId(req, res, next) {
	const { id } = req.params;
	emp.findEmployeeById(id).then(emp => {
		if (emp) {
			req.emp = emp;
			next();
		} else {
			res.status(404).json({
				error: 'there is no employee with that id',
			});
		}
	});
}

module.exports = router;
