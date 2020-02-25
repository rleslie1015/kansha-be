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
				message: 'Could not retrieve employees from the database',
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
				message: 'Employee could not be retrieved from the database',
			});
		});
});

// Delete an employee

router.delete('/:id', validateEmployeeId, (req, res) => {
	const id = req.params.id;
	emp.deleteEmployee(id)
		.then(emp => {
			res.status(204).json({
				response: 'Successfully deleted employee',
			});
		})
		.catch(error => {
			console.log('error deleting employee', error);
			res.status(500).json({
				error: 'Error Deleting employee',
			});
		});
});

// Add an employee

router.post('/', (req, res) => {
	const currentOrgId = req.profile.org_id;

	const { first_name, last_name } = req.body;

	// if (!userModel.findById(employeeId)) {
	// 	userModel
	// 		.addUser({})
	// 		.then(newUser => {
	// 			emp.addEmployee()
	// 				.then(newEmployee => {
	// 					res.status(201).json(newEmployee);
	// 				})
	// 				.catch(error => {
	// 					console.log('error adding employee', error);
	// 					res.status(500).json({
	// 						error: 'Error Adding employee',
	// 					});
	// 				});
	// 		})
	// 		.catch(error => {
	// 			console.log('error adding user', error);
	// 			res.status(500).json({ error: 'Error adding user' });
	// 		});
	// } else {
	//     emp.addEmployee({user_id: currentUserId,
	//     org_id: currentOrgId}).then(newEmployee => {
	//         res.status(201).json(newEmployee)
	//     })
	// }
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
				message: 'Failed to update the employee',
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
