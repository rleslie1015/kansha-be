// const router = require('express').Router();

// const auth = require('../../middleware/authMiddleWare');

// router.use(auth.validateId);

// // Get all recognitions for the organization
// router.get('/rec', (req, res) => {
// 	emp.getEmployeesByOrg(orgId, req.query)
// 		.then(emp => {
// 			res.status(200).json(emp);
// 		})
// 		.catch(error => {
// 			console.log(error, 'error');
// 			res.status(500).json({
// 				error: 'Employee List could not be retrieved from the database',
// 			});
// 		});
// });