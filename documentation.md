## **CSV Upload**

Allows users to upload a csv file of employees. The router then loops over each employee and adds each employee to the database.

**URL**

_/csv_

**Method:**

`POST`

**Post Object**

_Requires a csv file be attached to the request._

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `Succesfully uploaded 5 users`

**Error Response:**

_If none of the employees have the required information or if the required headers are wrong_

-   **Code:** 400 <br />
    **Content:** `Each employee needs a 'First Name', 'Last name', 'Job title' and 'Email'`

**Sample Call:**

One option for handling sending a csv file on the front end is to use the FormData() constructor. The following is an example of using FormData() to attach a csv file to the post request\_

    const handleSubmit = e => {
    	e.preventDefault();
    	const data = new FormData(); // creates a form object
    	data.append('bulkupload', file); // attaches the csv

    	axiosWithAuth()
    		.post('/csv', data)
    		.then(response => {
    			console.log('success');
    		})
    		.catch(error => {
    			console.log(error.response);
    		});
    };
    ```

_You will also need to verify that the file uploaded is a csv file. Here is an example of how to handle that._

    const onDrop = useCallback(acceptedFiles => {
    	acceptedFiles.forEach(file => {
    		if (file.name.substr(file.name.length - 3) === 'csv') {
    			const reader = new FileReader();
    			reader.onabort = () => setError('file reading was aborted');
    			reader.onerror = () => setError('file reading has failed');
    			reader.onload = () => {
    				setFile(file);
    			};
    			reader.readAsArrayBuffer(file);
    		} else {
    			setError('Please choose a CSV file.');
    		}
    	});
    }, []);
    ```

## **Fetch All Employees**

Retrieves data about every employee.

**URL**

_/employees_

**Method:**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `[ { "user_id": 1, "first_name": "Matt", "last_name": "Masters", "email": null, "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png", "job_title": "Dev God", "user_type": "Admin", "department": "Department of Gods", "org_id": 1, "id": 1, "org_name": "IonQ" }, { "user_id": 2, "first_name": "Ty", "last_name": "Lippe", "email": null, "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png", "job_title": "Dev Apprentice", "user_type": "Mod", "department": "Department of Devs", "org_id": 1, "id": 2, "org_name": "IonQ" }]`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Employee List could not be retrieved from the database`

**Sample Call:**

    	axiosWithAuth()
    		.get('/employees')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

## **Fetch Employees In The Logged-in User's Organization**

**URL**

_/employees/organizations_

**Method:**

`GET`

**Success Response:**
_returns an array of employees as well as a count that represents the number of employees in the organization_

-   **Code:** 200 <br />
    **Example Content:** `{ "count": 1, "employees": [ { "id": 50, "first_name": "Joss", "last_name": "Stancek", "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png", "job_title": "Dev Popcicle", "user_type": "Admin", "department": "Department of Popcicles", "org_name": "Kevin's Funhouse" } ] }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Employee List could not be retrieved from the database`

**Sample Call:**

    	axiosWithAuth()
    		.get('/employees/organizations')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

## **Fetch One Employee by ID**

**URL**

_/employees/:id_

**Method:**

`GET`

**Success Response:**
_returns an array of employees as well as a count that represents the number of employees in the organization_

-   **Code:** 200 <br />
    **Example Content:** `{ "user_id": 7, "first_name": "Andrew1", "last_name": "Ackerman", "email": null, "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png", "job_title": "SoftwareDev", "user_type": "Admin", "department": "Software", "org_id": 15, "id": 9, "org_name": "Ionn" }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Employee could not be retrieved from the database`

**Sample Call:**

    	axiosWithAuth()
    		.get('/employees/7')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});
