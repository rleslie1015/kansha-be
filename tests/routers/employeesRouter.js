const server = require('../../server');
const request = require('supertest');

module.exports = () =>
	describe('employees router', () => {
		describe('POST /employees', () => {
			it('should return new employee ID', async () => {
				const { body } = await request(server)
					.post('/employees')
					.send({
						first_name: 'Test',
						last_name: 'User 5',
						email: 'testing_email2@kansharewards.com',
						department: 'X',
						job_title: 'Person',
						user_type: 'admin',
						org_name: 'Organization 3',
					});
				expect(body.user_id).toBe(6);
			});
		});

		describe('GET /employees', () => {
			it('should return a list of employees', async () => {
				const { body } = await request(server).get('/employees');
				expect(body).toEqual(
					expect.arrayContaining([
						{
							department: 'X',
							email: 'test.user1@kansharewards.com',
							first_name: 'Test',
							id: 1,
							job_title: 'Job Title',
							last_name: 'User 1',
							org_id: 1,
							org_name: 'Organization 1',
							profile_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
							user_id: 1,
							user_type: 'admin',
						},
					]),
				);
			});
		});

		describe('DELETE /employees/:id', () => {
			it('should successfully delete an employee by id', async () => {
				const { status } = await request(server).delete('/employees/5');
				expect(status).toBe(204);
			});
		});

		describe('GET /employees/:id', () => {
			it('should fetch one employee', async () => {
				const { body } = await request(server).get('/employees/3');
				expect(body).toMatchObject({
					id: 3,
					user_id: 3,
					first_name: 'Test',
					last_name: 'User 6',
					email: 'test.user3@kansharewards.com',
					org_id: 2,
					department: 'X',
					profile_picture:
						'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
					job_title: 'Will be deleted',
					user_type: 'admin',
					org_name: 'Organization 2',
				});
			});
		});

		describe('PUT /employees:id', () => {
			it('should edit an employee by id', async () => {
				const { body } = await request(server)
					.put('/employees/3')
					.send({
						last_name: 'User 100',
						job_title: 'Will be deleted',
					});
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: 3,
							sub: '3',
							first_name: 'Test',
							last_name: 'User 100',
							department: 'X',
							profile_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
							email: 'test.user3@kansharewards.com',
							job_title: 'Will be deleted',
							user_type: 'admin',
							org_id: 2,
							org_name: 'Organization 2',
						},
					]),
				);
			});
		});
	});
