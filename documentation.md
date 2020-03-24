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
-   [**Organizations Endpoints**](#--organizations-endpoints--)
    -   [**Fetch All Organizations**](#--fetch-all-organizations--)
    -   [**Add an Organization**](#--add-an-organization--)
    -   [**Fetch One Organization**](#--fetch-one-organization--)
    -   [**Edit an Organization**](#--edit-an-organization--)
    -   [**Delete One Organization**](#--delete-one-organization--)
-   [**Live Feed Endpoints**](#--live-feed-endpoints--)
    -   [**See All Recognitions from One Organization**](#--see-all-recognitions-from-one-organization--)
    -   [**See a Live Feed of Recognitions from One Organization**](#--see-a-live-feed-of-recognitions-from-one-organization--)
-   [**Reports Endpoints**](#--reports-endpoints--)
    -   [**Get an Organizations Reports**](#--get-an-organizations-reports--)
    -   [**Get an Organizations Report for Top Thankers and Receivers**](#--get-an-organizations-report-for-top-thankers-and-receivers--)
    -   [**Get an Organizations Report for Employee Engagement**](#--get-an-organizations-report-for-employee-engagement--)
    -   [**Get an Organizations Report for Recognition Count in given date range**](#--get-an-organizations-report-for-recognition-count-in-given-date-range--)
-   [**Profile Endpoints**](#--profile-endpoints--)
    -   [**Fetch a Users Profile**](#--fetch-a-users-profile--)
-   [**Reaction Endpoints**](#--reaction-endpoints--)
    -   [**Fetch Reactions for a given Recognition**](#--fetch-reactions-for-a-given-recognition--)
    -   [**Post a Reaction for a given Recognition**](#--post-a-reaction-for-a-given-recognition--)
    -   [**Delete a Reaction for a given Recognition**](#--delete-a-reaction-for-a-given-recognition--)
-   [**Comment Endpoints**](#--comment-endpoints--)
    -   [**Fetch Comments for a given Recognition**](#--fetch-comments-for-a-given-recognition--)
    -   [**Post a new Comment for a given Recognition**](#--post-a-new-comment-for-a-given-recognition--)
    -   [**Delete a Comment for a given Recognition**](#--delete-a-comment-for-a-given-recognition--)
-   [**Badge Endpoints**](#--badge-endpoints--)

    -   [**Fetch a Comprehensive List of Available Badges**](#--fetch-a-comprehensive-list-of-available-badges--)

-   [**Recognition Endpoints**](#--recognition-endpoints--)
    -   [**Fetch All Recognitions**](#--fetch-all-recognitions--)
    -   [**Fetch All Recognitions in a given Organization**](#--fetch-all-recognitions-in-a-given-organization--)
    -   [**Fetch One Recognition by recid**](#--fetch-one-recognition-by-recid--)
    -   [**Post a New Recognition**](#--post-a-new-recognition--)
    -   [**Delete a Recognition by recid**](#--delete-a-recognition-by-recid--)
    -   [**Edit a Recognition by recid**](#--edit-a-recognition-by-recid--)
    -   [**Profile Pic Endpoints**](#--profile-pic-endpoints--)
    -   [**Post a New Profile Picture**](#--post-a-profile-pic--)
-   [**User Endpoints**](#--user-endpoints--)

    -   [**Fetch all Users**](#--fetch-all-users--)
    -   [**Fetch a User by ID**](#--fetch-a-user-by-id--)
    -   [**Create a New User**](#--create-a-new-user--)
    -   [**Delete a User by ID**](#--delete-a-user-by-id--)
    -   [**Edit a User by ID**](#--edit-a-user-by-id--)

-   [**Teams Endpoints**](#--teams-endpoints--)
    -   [**Fetch all Teams and Team Members**](#--fetch-all-teams--)
    -   [**Fetch a Team by ID with Team Members**](#--fetch-a-team-by-id--)
    -   [**Create a New Team with multiple members**](#--create-a-new-team--)
    -   [**Add a new team member to a team**](#--create-a-new-team-member--)
    -   [**Delete a Team by ID and Delete Members on the Team**](#--delete-a-team-by-id--)
    -   [**Edit a Team by ID**](#--edit-a-team-by-id--)
    -   [**Fetch a Team Member by ID**](#--fetch-a-team-member-by-id--)
    -   [**Delete a Team Member by ID**](#--delete-a-team-member-by-id--)
    -   [**Edit a Team Member by ID**](#--edit-a-team-member-by-id--)

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
-   [**Fetch Employees In The Logged-in User's Organization**](#--fetch-employees-in-the-logged-in-users-organization--)
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

-   [**Fetch All Organizations**](#--fetch-all-organizations--)
-   [**Add an Organization**](#--add-an-organization--)
-   [**Fetch One Organization**](#--fetch-one-organization--)
-   [**Edit an Organization**](#--edit-an-organization--)
-   [**Delete One Organization**](#--delete-one-organization--)

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

### **Fetch One Organization**

**URL**

_/organizations/:id_

**Method:**

`GET`

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns the org object that was just requested

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error getting org`

OR

_if the id you pass in doesn't match with any org in the database_

-   **Code:** 400 <br />
    **Content:** `there is no org with that id`

OR

_if you're trying to update an org that's not the org you're logged in with_

-   **Code:** 406 <br />
    **Content:** `Not Acceptable`

### **Edit an Organization**

**URL**

_/organizations/:id_

**Method:**

`PUT`

**URL Params**

**Required:**

`id=[integer]`

**Data Params**

-   **Optional:**

    -   `name` (string)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns the org object that was just updated

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Failed to update the organization`

OR

_if the id you pass in doesn't match with any org in the database_

-   **Code:** 400 <br />
    **Content:** `there is no org with that id`

OR

_if you're trying to update an org that's not the org you're logged in with_

-   **Code:** 406 <br />
    **Content:** `Not Acceptable`

### **Delete One Organization**

**URL**

_/organizations/:id_

**Method:**

`DELETE`

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 204 <br />
    **Example Content:** `Successfully deleted organization`

**Error Response:**

-   **Code:** 500 <br />
    **Content:** `Error Deleting org`

OR

_if the id you pass in doesn't match with any org in the database_

-   **Code:** 400 <br />
    **Content:** `there is no org with that id`

OR

_if you're trying to update an org that's not the org you're logged in with_

-   **Code:** 406 <br />
    **Content:** `Not Acceptable`

## **Live Feed Endpoints**

-   [**See All Recognitions from One Organization**](#--see-all-recognitions-from-one-organization--)
-   [**See a Live Feed of Recognitions from One Organization**](#--see-a-live-feed-of-recognitions-from-one-organization--)

### **See All Recognitions from One Organization**

**URL**

_/feed_

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

## **Reports Endpoints**

-   [**Get an Organizations Reports**](#--get-an-organizations-reports--)
-   [**Get an Organizations Report for Top Thankers and Receivers**](#--get-an-organizations-report-for-top-thankers-and-receivers--)
-   [**Get an Organizations Report for Employee Engagement**](#--get-an-organizations-report-for-employee-engagement--)
-   [**Get an Organizations Report for Recognition Count in given date range**](#--get-an-organizations-report-for-recognition-count-in-given-date-range--)

### **Get an Organizations Reports**

**URL**

_/reports_

**Method**

`GET`

**URL Params**

**Optional:**
_You can pass in "years" "months" or "weeks" to get how many recognitions were sent over that time period. It uses 'years' by default_
`time=[string]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `5`

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.put('/reports?time=months')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

**Notes:**

_The idea behind this endpoint is that the user can see how many people have sent or received thanks in the organization over a given time period. This can be useful for charts on the admin dashboard._

### **Get an Organizations Report for Top Thankers and Receivers**

**URL**

_/reports/top_

**Method**

`GET`

**URL Params**

**Optional:**
_You can pass in "years" "months" or "weeks" to get the top employees over that time period. It returns 'years' by default_
`time=[string]`

_You can pass in "recipient" or "sender" to get either the top thanked or the top thankful, respectively. By default it returns top thankful_
`type=[string]`

_You can pass in the number of employees you want to receive back_
`limit=[integer]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `{ "count": 5, "employees": [{first_name: "Aaron", last_name: "Gillies", recipient: 47, profile_picture: "https://kansha-bucket.s3.us-west-1.amazonaws.com/1583441408751", count: "7"}, {first_name: "John", last_name: "Smith", recipient: 55, profile_picture: "https://kansha-bucket.s3.us-west-1.amazonaws.com/1583441408751", count: "5"}, {first_name: "Jane", last_name: "Johnson", recipient: 43, profile_picture: "https://kansha-bucket.s3.us-west-1.amazonaws.com/1583441408751", count: "4"}, {first_name: "Mark", last_name: "Cuban", recipient: 83, profile_picture: "https://kansha-bucket.s3.us-west-1.amazonaws.com/1583441408751", count: "3"}, {first_name: "Juliet", last_name: "Capulet", recipient: 34, profile_picture: "https://kansha-bucket.s3.us-west-1.amazonaws.com/1583441408751", count: "1"}] }`

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.put('/reports?time=months&type=sender&limit=5')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Get an Organizations Report for Employee Engagement**

**URL**

_/reports/engagement_

**Method**

`GET`

**URL Params**

**Optional:**
_You can pass in "years" "months" or "weeks" to get percent of people engaged over that time period_
`time=[string]`

_You can pass in "recipient" or "sender" to get either the percent of people who received thanks or sent thanks respectively_
`person=[string]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `{ "numberOfPeople": 2, "numberOfPeopleInOrg": 4, "percentThanked": 50 }`

**Error Response:**

-   **Code:** 500 <br />

**Sample Call:**

    	axiosWithAuth()
    		.put('/reports?time=months&person=sender')
    		.then(response => {
    			console.log(response);
    		})
    		.catch(error => {
    			console.log(error.response);
    		});

### **Get an Organizations Report for Recognition Count in given date range**

**URL**

_/reports/range_

**Method**

`GET`

**URL Params**

**Optional:**
_You can pass in "years" "months" or "weeks" to get data over those time periods_
`time=[string]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** `{ "count": 10, "results": { "March": 4, "February": 3, "January": 2, "December": 0, "November": 1, "October": 0, "September": 0, "August": 0, "July": 0, "June": 0, "May": 0, "April": 0 } }`

**Error Response:**

-   **Code:** 500 <br />

## **Profile Endpoints**

-   [**Fetch a Users Profile**](#--fetch-a-users-profile--)

### **Fetch a Users Profile**

**URL**

_/profile/:id_

**Method**

`GET`

**URL Params**

**Required:**

`id=[integer]`
**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns the user's profile data


        peer: {
            "id": 1
            "first_name": "Matt",
            "last_name": "Masters",
            "profile_picture": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png",
            "job_title": "Dev God",
            "user_type": "Admin",
            "org_name": "Ion",
            "teams": [
                {
                    "team_id": 21,
                    "name": "rockstars",
                    "member_id": 12,
                    "team_role": "manager"
                },
                {
                    "team_id": 23,
                    "name": "winners",
                    "member_id": 13,
                    "team_role": "manager"
                }
            ],
            "rec":[
                {
                    "id":1,
                    "recipeient": 1,
                    "sender": 2.
                    "message": "Go forth and be a God".
                    "date": "2019-11-13T07:00:00.000Z",
                    "badge_id": null,
                    "org_id": 1,
                    "first_name" "Ty",
                    "last_name": "Lippe",
                    "profile_pic": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png"
                },
                 {
                    "id":3,
                    "recipeient": 3,
                    "sender": 1.
                    "message": "Go be a popsicle!".
                    "date": "2019-11-13T07:00:00.000Z",
                    "badge_id": null,
                    "org_id": 1,
                    "first_name" "Andrew",
                    "last_name": "Maddocks",
                    "profile_pic": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png"
                },

            ]

        }

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message

## **Reaction Endpoints**

-   [**Fetch Reactions for a given Recognition**](#--fetch-reactions-for-a-given-recognition--)
-   [**Post a Reaction for a given Recognition**](#--post-a-reaction-for-a-given-recognition--)
-   [**Delete a Reaction for a given Recognition**](#--delete-a-reaction-for-a-given-recognition--)

### **Fetch Reactions for a given Recognition**

**URL**

_/reactions/:rec_id_

**Method**

`GET`

**URL Params**

**Required:**

`rec_id=[integer]`
**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns the recognition's reactions

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />
    **Code:** 404 <br />
    **Example Content:** {message: 'reactions not found'}

### **Post a Reaction for a given Recognition**

**URL**

_/reactions/_

**Method**

`POST`

**URL Params**

**Required:**

`rec_id=[integer]`
**Success Response:**

-   **Code:** 201 <br />
    **Example Content:** returns the newly created reaction

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Delete a Reaction for a given Recognition**

**URL**

_/reactions/:id_

**Method**

`DELETE`

**URL Params**

**Required:**

`id=[integer]`
**Success Response:**

-   **Code:** 204 <br />

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

## **Comment Endpoints**

-   [**Fetch Comments for a given Recognition**](#--fetch-comments-for-a-given-recognition--)
-   [**Post a new Comment for a given Recognition**](#--post-a-new-comment-for-a-given-recognition--)
-   [**Delete a Comment for a given Recognition**](#--delete-a-comment-for-a-given-recognition--)

### **Fetch Comments for a given Recognition**

**URL**

_/comments/rec_id_

**Method**

`GET`

**URL Params**

**Required:**

`rec_id=[integer]`
**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns the recognition's comments

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />
    **Code:** 404 <br />
    **Example Content:** {message: 'post not found'}

### **Post a new Comment for a given Recognition**

**URL**

_/comments/_

**Method**

`POST`

**Success Response:**

-   **Code:** 201 <br />
    **Example Content:** returns the newly created comment

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Delete a Comment for a given Recognition**

**URL**

_/comments/:id_

**Method**

`DELETE`

**Data Params**

-   **Required:**
    -   `rec_id` (integer)
    -   `id` (integer)

**Success Response:**

-   **Code:** 204 <br />

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

## **Badge Endpoints**

-   [**Fetch a Comprehensive List of Available Badges**](#--fetch-a-comprehensive-list-of-available-badges--)

### **Fetch a Comprehensive List of Available Badges**

**URL**

_/badges/_

**Method**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns an array of badges

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

## **Recognition Endpoints**

-   [**Fetch All Recognitions**](#--fetch-all-recognitions--)
-   [**Fetch All Recognitions in a given Organization**](#--fetch-all-recognitions-in-a-given-organization--)
-   [**Fetch One Recognition by recid**](#--fetch-one-recognition-by-recid--)
-   [**Post a New Recognition**](#--post-a-new-recognition--)
-   [**Delete a Recognition by recid**](#--delete-a-recognition-by-recid--)
-   [**Edit a Recognition by recid**](#--edit-a-recognition-by-recid--)

### **Fetch All Recognitions**

**URL**

_/rec/_

**Method**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns array of all recognitions

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Fetch All Recognitions in a given Organization**

**URL**

_/rec/admin_

**Method**

`GET`

**Data Params**

-   **Required:**
    -   `org_id` (integer)

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns array of organization's recognitions

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** {error: 'Recognition List could not be retrieved from the database'} <br />

### **Fetch One Recognition by recid**

**URL**

_/rec/:id_

**Method**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns recognition

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** {error: 'Recognition List could not be retrieved from the database'} <br />
    **Code:** 404
    **Example Content:** {message: 'post not found'}

### **Post a New Recognition**

**URL**

_/rec/_

**Method**

`POST`

**Success Response:**

-   **Code:** 201 <br />
    **Example Content:** returns newly created recognition

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Delete a Recognition by recid**

**URL**

_/rec/:id_

**Method**

`DELETE`

**Success Response:**

-   **Code:** 204 <br />

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Edit a Recognition by recid**

**URL**

_/rec/:id_

**Method**

`PUT`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns edited recognition

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

## **Profile Pic Endpoints**

-   [**Post a New Profile Picture**](#--post-a-profile-pic--)

### **Post a New Profile Picture**

**URL**

_/profile-pic/_

**Method**

`POST`

**Success Response:**

-   **Example Content:** returns a json object with the picture url referencing the file location.

## **User Endpoints**

-   [**Fetch all Users**](#--fetch-all-users--)
-   [**Fetch a User by ID**](#--fetch-a-user-by-id--)
-   [**Create a New User**](#--create-a-new-user--)
-   [**Delete a User by ID**](#--delete-a-user-by-id--)
-   [**Edit a User by ID**](#--edit-a-user-by-id--)

### **Fetch all Users**

**URL**

_/users/_

**Method**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns array of all users

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Fetch a User by ID**

**URL**

_/users/:id_

**Method**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns user object

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />
    **Code:** 404
    **Example Content:** {message: 'user not found'}

### **Create a New User**

**URL**

_/users/_

**Method**

`POST`

**Success Response:**

-   **Code:** 201 <br />
    **Example Content:** returns newly created user

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Delete a User by ID**

**URL**

_/users/:id_

**Method**

`DELETE`

**Success Response:**

-   **Code:** 204 <br />

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

### **Edit a User by ID**

**URL**

_/users/:id_

**Method**

`PUT`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:** returns edited user

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error message <br />

## **Teams Endpoints**

-   [**Teams Endpoints**](#--teams-endpoints--)
-   [**Fetch all Teams and Team Members**](#--fetch-all-teams--)
    -   [**Fetch a Team by ID with Team Members**](#--fetch-a-team-by-id--)
    -   [**Create a New Team with multiple members**](#--create-a-new-team--)
    -   [**Add a new team member to a team**](#--create-a-new-team-member--)
    -   [**Delete a Team by ID and Delete Members on the Team**](#--delete-a-team-by-id--)
    -   [**Edit a Team by ID**](#--edit-a-team-by-id--)
    -   [**Fetch a Team Member by ID**](#--fetch-a-team-member-by-id--)
    -   [**Delete a Team Member by ID**](#--delete-a-team-member-by-id--)
    -   [**Edit a Team Member by ID**](#--edit-a-team-member-by-id--)

### **Fetch All Teams for and organization**

Returns all teams and team members for an organization.

**URL**

_/teams_

**Method:**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**
    `[{ "team_id": 21, "name": "rockstars", "count":7, "managers": [ { "member_id": 1, "user_id": 17, "first_name": "d", "last_name": "cluddles" }, { "member_id": 10, "user_id": 10, "first_name": "kevin", "last_name": "gilles" } ] }, { "team_id": 23, "name": "winners", "count":1, "managers": [ { "member_id": 5, "user_id": 13, "first_name": "kevin", "last_name": "gilles" } ] } ]`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**
    error: 'Teams could not be retrieved from the database'

**Sample Call:**

    axiosWithAuth()
        .get('/teams')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Fetch a Team by ID with Team Members**

Returns one team with team members.

**URL**

_/teams/:id_

**Method:**

`GET`

**URL Params**

**Required:**

`id=[integer]`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**
    `{"team_members": [ { "id": 1, "user_id": 17, "first_name": "d", "last_name": "cluddles", "profile_picture": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png" }, { "id": 2, "user_id": 16, "first_name": "jessica", "last_name": "peter", "profile_picture": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png" }, { "id": 3, "user_id": 15, "first_name": "jacey", "last_name": "san", "profile_picture": "https://kansha-bucket.s3-us-west-1.amzononaws.com/avatarblank.png" } ]}`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**
    error: 'Team could not be retrieved from the database'

**Sample Call:**

    axiosWithAuth()
        .get('/teams/21')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Create a New Team with multiple members**

Adds new team with multiple team members.

**URL**

_/teams_

**Method:**

`POST`

**Data Params**

**Required:**

Team name required.

-   `name` (string)

**Optional:**

To add multiple team members.

-   `newMembersArray`: [{"user_id": 15, "team_role": "manager"}, {"user_id": 18, "team_role": "member"}, {"user_id": 19, "team_role": "member"}]

**Success Response:**

-   **Code:** 201 <br />
    **Example Content:**
    "message": "Successfully added 3 members to team rockstars!"

**Error Response:**

-   **Code:** 400 <br />
    **Content:**
    error: 'Team needs a name'

-   **Code:** 500 <br />
    **Content:**
    error: 'Error adding team'

**Sample Call:**

    axiosWithAuth()
        .post('/teams, {name: "team-name")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Add a new team member to a team**

Adds a new team member to a team

**URL**

_/teams/:id_

**URL_PARAMS**
**Required:**
`team's id`
`id=[integer]`

**Data Params**

**Required:**

-   `user_id` (integer)
-   `team_role` (string)

**Method:**

`POST`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**`{ "id": 11, "user_id": 14, "team_id": 21, "team_role": "manager", "active": true, "team_name": "rockstars", "first_name": "vanessa", "last_name": "san", "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png" }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**`error: 'Error adding member'`

**Sample Call:**

    axiosWithAuth()
        .post('/teams/1', {"id": 1, "team_role": "manager"})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Delete a Team by ID and Delete Members on the Team**

Deletes a Team by ID and also deletes all team members on that team

**URL**

_/teams/:id_

**URL_PARAMS**
**Required:**
`team's id`
`id=[integer]`

**Method:**

`DELETE`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**

**Error Response:**

-   **Code:** 500 <br />
    **Content:**

**Sample Call:**

    axiosWithAuth()
        .delete('/teams/1')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Edit a Team by ID**

Edits a team by ID

**URL**

_/teams/:id_

**URL_PARAMS**
**Required:**
`team's id`
`id=[integer]`

**Method:**

`PUT`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**`{ "id": 21, "name": "rockstars", "org_id": 1 }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**`error: 'Failed to update Team'`
    **Sample Call:**

        axiosWithAuth()
            .put('/teams/1')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });

### **Fetch a Team Member by ID**

Returns information for a team member

**URL**

_/teams/members/:id_

**URL_PARAMS**
**Required:**
`team member's id`
`id=[integer]`

**Method:**

`GET`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**`{ "id": 5, "user_id": 13, "team_id": 23, "team_role": "member", "active": false, "team_name": "winners", "first_name": "kevin", "last_name": "gillies", "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png" }`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**`error: 'Member could not be retrieved from the database'`

**Sample Call:**

    axiosWithAuth()
        .get('/teams/members/1')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Delete a Team Member by ID**

Returns record of deleted team member

**URL**

_/teams/members/:id_

**Method:**

`DELETE`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**`1`

**Error Response:**

-   **Code:** 500 <br />
    **Content:**`error: 'Error Deleting team member'`

**Sample Call:**

    axiosWithAuth()
        .delete('/teams/members/1')
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error.response);
        });

### **Edit a Team Member by ID**

Returns edited team and team members

**URL**

_teams/members/:id_

**URL_PARAMS**
**Required:**
`team member's id`
`id=[integer]`

**Method:**

`PUT`

**Success Response:**

-   **Code:** 200 <br />
    **Example Content:**
    `{ "id": 5, "user_id": 13, "team_id": 23, "team_role": "member", "active": false, "team_name": "winners", "first_name": "kevin", "last_name": "gillies" "profile_picture": "https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png" }`

**Error Response:**

-   **Code:** 500 <br />
    **Example Content:** error: 'Failed to update Team Member' <br />
    **Sample Call:**

        axiosWithAuth()
            .put('/teams/members/1')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response);
            });
