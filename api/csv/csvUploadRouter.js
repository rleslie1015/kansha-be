/* 
As a front end engineer I can create a button that when clicked will upload a CSV file to 
an AWS bucket

1. Take the csv, convert it to an array of JSON objects
2. for each JSON object make a post request to /employees

*/

const csv = require('csvtojson');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');

router.use(auth.validateId);

router.get('/', async (req, res) => {
	const csvFilePath = './api/csv/employeeCSV.csv';

	try {
		const jsonArray = await csv().fromFile(csvFilePath);
		console.log(jsonArray);
		return res.status(200).json(jsonArray);
	} catch (error) {
		console.log(error, 'error');
		return res.status(500).json(error);
	}
});

module.exports = router;
