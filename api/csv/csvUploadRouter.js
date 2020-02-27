/* 
As a front end engineer I can create a button that when clicked will upload a CSV file to 
an AWS bucket

1. Take the csv, convert it to an array of JSON objects
2. for each JSON object make a post request to /employees

*/

const csv = require('csvtojson');
const router = require('express').Router();
const auth = require('../../middleware/authMiddleWare');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(auth.validateId);

router.post('/', upload.single('bulkupload'), async (req, res) => {
	// const csvFilePath = req.file;

	try {
		const jsonArray = await csv().fromString(req.file.buffer.toString());

		/*
// create migration to remove notnullable from 'sub' in the user table

        // loop over the array
            // for each element check if required fields are present
                // create a user for each one
                    // add that user to the employee table
                        // DON'T FORGET to give user_type (standard)

        // if none of the fields work, then return 400 error 
            //(you need a first_name, last_name, email, department, job_title)
        
        // if it worked return a success message, the number of employees added
        return res.status(200).json(jsonArray);
        
        */
	} catch (error) {
		console.log(error, 'error');
		return res.status(500).json(error);
	}

	// console.log(req.file.buffer.toString());
	// res.status(200).end();
});

module.exports = router;
