# **Kansha Back-End Documentation**

### **Table of Contents**

-   [**CSV Endpoints**](#--csv-endpoints--)
    -   [**CSV Upload**](#--csv-upload--)
-   [**Employees Endpoints**](#--employees-endpoints--)
    -   [**Fetch All Employees**](#--fetch-all-employees--)
    -   [**Fetch Employees In The Logged-in User's Organization**](#--fetch-employees-in-the-logged-in-users-organization--)
    -   [**Fetch One Employee by ID**](#--fetch-one-employee-by-id--)
    -   [**Delete An Employee**](#--delete-an-employee--)
    -   [**Edit An Employee**](#--edit-an-employee--)
    -   [**Add An Employee**](#--add-an-employee--)
-   [**Organizations Endpoints**](#--csv-endpoints--)
-   [**Live Feed Endpoints**](#--live-feed-endpoints--)
-   [**Reports Endpoints**](#--reports-endpoints--)

## **CSV Endpoints**

-   [**CSV Upload**](#--csv-upload--)

### **CSV Upload**

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

## **Employees Endpoints**

-   [**Fetch All Employees**](#--fetch-all-employees--)
-   [**Fetch Employees In The Logged-in User's Organization**](#--fetch-employees-in-the-logged-in-user-s-organization--)
-   [**Fetch One Employee by ID**](#--fetch-one-employee-by-id--)
-   [**Delete An Employee**](#--delete-an-employee--)
-   [**Edit An Employee**](#--edit-an-employee--)
-   [**Add An Employee**](#--add-an-employee--)

### **Fetch All Employees**

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

### **Fetch Employees In The Logged-in Users Organization**

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

### **Fetch One Employee by ID**

**URL**

_/employees/:id_

**Method:**

`GET`

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `{ "user_id": 7, "first_name": "Andrew1", "last_name": "Ackerman", "email": null, "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png", "job_title": "SoftwareDev", "user_type": "Admin", "department": "Software", "org_id": 15, "id": 9, "org_name": "Ionn" }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Employee could not be retrieved from the database`

OR

_if the id doesn't exist_

-   **Code:** 404 <br />
    **Content:** `There is no employee with that id`

**Sample Call:**

    	axiosWithAuth()
    		.get('/employees/7')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Delete An Employee**

**URL**

_/employees/:id_

**Method:**

`DELETE`

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 204 <br />

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error deleting employee`

OR

_if the id doesn't exist_

-   **Code:** 404 <br />
    **Content:** `There is no employee with that id`

**Sample Call:**

    	axiosWithAuth()
    		.delete('/employees/7')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Edit An Employee**

**URL**

_/employees/:id_

**Method:**

`EDIT`

**Data Params**

-   **Optional:**

    -   `first_name` (string)
    -   `last_name` (string)
    -   `email` (string) _must be unique_
    -   `user_type` (string) should be "Admin" or "Standard"
    -   `department` (string)
    -   `job_title` (string)

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 200 <br />
    **Content:** returns the employee that was updated

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Failed to Update the Employee`

OR

_if the id doesn't exist_

-   **Code:** 404 <br />
    **Content:** `There is no employee with that id`

**Sample Call:**

    	axiosWithAuth()
    		.put('/employees/7')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Add an Employee**

**URL**

_/employees_

**Method:**

`POST`

**Data Params**

-   **Required:**

    -   `first_name` (string)
    -   `last_name` (string)
    -   `email` (string) _must be unique_
    -   `user_type` (string) should be "Admin" or "Standard"

-   **Optional:**

    -   `department` (string)
    -   `job_title` (string)

**Success Response:**

-   **Code:** 201 <br />
    **Content:** returns the added employee

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error adding user`

OR

_if first name, last name, or email weren't included in the post_

-   **Code:** 400 <br />
    **Content:** `You need to pass in first_name, last_name, and email`

OR

_if user type wasn't included in the post_

-   **Code:** 500 <br />
    **Content:** `Error adding user`

**Sample Call:**

    	axiosWithAuth()
    		.post('/employees', {first_name: "Jane", last_name: "Smith", email: "jane@kansharewards.com", user_type: "Admin", department: "Sales", job_title: "manager"})
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

**Notes:**

_If you add an employee using an email address that is not already in the user database, then that user is added to the user database as well as the employee database_

## **Organizations Endpoints**

### **Fetch All Organizations**

Retrieves data about every organization.

**URL**

_/organizations_

**Method:**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `[{ "id": 2, "name": "Kevin's Funhouse" }, { "id": 12, "name": "Blurgh Company" }, { "id": 15, "name": "Ionn" }]`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error getting all orgs`

**Sample Call:**

    	axiosWithAuth()
    		.get('/organizations')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Add an Organization**

**URL**

_/organizations_

**Method:**

`POST`

**Data Params**

-   **Required:**
    -   `name` (string)

**Success Response:**

-   **Code:** 201 <br />
    **Example Content:** returns the org object that was just created

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error adding organization`

OR

_if you don't pass in the name property_

-   **Code:** 400 <br />
    **Content:** `Organization needs a name`

**Sample Call:**

    	axiosWithAuth()
    		.post('/organizations', {name: "organization-name"})
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

## **Live Feed Endpoints**

-   [**Live Feed Endpoints**](#--live-feed-endpoints--)

### **See All Recognitions from One Organization**

**URL**

_/feed/_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns all recognitions belonging to the organization of the org_id provided

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.get('/feed')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});

### **See a Live Feed of Recognitions from One Organization**

**URL**

_/feed/live_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns all live recognitions belonging to the organization of the org_id provided

**Sample Call:**

    	axiosWithAuth()
    		.get('/feed/live')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});

## **Reports Endpoints**

-   [**Reports Endpoints**](#--reports-endpoints--)

### **Get an Organization's Reports**

**URL**

_/reports/_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns all reports for a given organization

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.get('/reports/')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});

### \*\*Get an Organization's Report for Top Thankers, Receivers

**URL**

_/reports/top_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns reports for top thankers, receivers for a given organization

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.get('/reports/top')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});

### \*\*Get an Organization's Report for Employee Engagement

**URL**

_/reports/engagement_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns reports for employee engagement for a given organization

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.get('/reports/engagement')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});

### \*\*Get an Organization's Report for Recognition Count in given date range

**URL**

_/reports/range_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)
    -       `req.query`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns report for recognition count in given date range

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.get('/reports/range')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error);
    		});
