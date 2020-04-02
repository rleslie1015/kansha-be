const router = require('express').Router();
const Emp = require('./employeeModel.js');
const Users = require('../user/userModel.js');

const auth = require('../../middleware/authMiddleWare');
const requiredFields = require('../../middleware/requiredField');

router.use(auth.validateId);

// Get all employees from the database
router.get('/', async (req, res) => {
	try {
		const employees = await Emp.findAllEmployees();
		res.status(200).json(employees);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Could not retrieve employees from the database',
		});
	}
});

// Endpoint to retrieve all employees belonging to a specific organization

router.get('/organizations', async (req, res) => {
	const { org_id } = req.profile;
	try {
		const employees = await Emp.getEmployeesByOrg(org_id, req.query);
		res.status(200).json(employees);
	} catch (error) {
		console.error('GET /organizations error', error);
		res.status(500).json({
			error: 'Employee List could not be retrieved from the database',
		});
	}
});

// Retrieve a specific employee from the database

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await Emp.findEmployeeById(id);
		res.status(200).json(employee);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Employee could not be retrieved from the database',
		});
	}
});

// Delete an employee

router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const { org_id } = req.profile;
	try {
		await Emp.deleteEmployee(id, org_id);
		res.sendStatus(204);
	} catch (error) {
		console.error('error deleting employee', error);
		res.status(500).json({
			error: 'Error Deleting employee',
		});
	}
});

// Add an employee

router.post(
	'/',
	requiredFields('first_name', 'last_name', 'email'),
	async (req, res) => {
		const { org_id } = req.profile;

		const {
			first_name,
			last_name,
			email,
			department,
			user_type,
			job_title,
		} = req.body;

		try {
			let [foundEmployee] = await Users.findByEmail(email);
			let employeeId;
			if (foundEmployee) {
				employeeId = foundEmployee.id;
			} else {
				[employeeId] = await Users.addNewUser({
					first_name,
					last_name,
					email,
					department,
					sub: 'no-auth',
				});
			}
			const newEmployee = await Emp.addEmployee({
				user_id: employeeId,
				org_id,
				user_type,
				job_title,
			});
			return res.status(201).json(newEmployee);
		} catch (error) {
			console.error('error adding user', error);
			return res.status(500).json({ error: 'Error adding user' });
		}
	},
);

// get the org id from the current user profile
// check if user exists
// if not create a new one
// create an employee on the employee table
// use the org id from the current user profile and the user id

// Edit an Employee
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	try {
		const employee = await Users.editUser(id, changes);
		res.status(200).json(employee);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Failed to update the employee',
		});
	}
});

// Middleware

// async function validateEmployeeId(req, res, next) {
// 	const { id } = req.params;
// 	try {
// 		const employee = await Emp.findEmployeeById(id);
// 		if (employee) {
// 			req.e = employee;
// 			next();
// 		} else {
// 			res.status(404).json({
// 				error: 'there is no employee with that id',
// 			});
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({
// 			error: 'Server error validating employee',
// 		});
// 	}
// }

module.exports = router;
