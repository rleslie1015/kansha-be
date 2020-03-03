const server = require('../server');
const request = require('supertest');
const testdb = require('../data/dbConfig');

jest.mock('express-jwt', () => {
	return jest.fn(() => {
		return jest.fn((req, res, next) => {
			req.user = {
				sub: '1',
				email: 'testing_email@kansharewards.com',
			};
			next();
		});
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

beforeAll(() => {
	return testdb.seed.run();
});

describe('/employees router', () => {
	describe('POST /employees', () => {
		it('should return new employee ID', async () => {
			const { body } = await request(server)
				.post('/employees')
				.send({
					first_name: 'Test',
					last_name: 'User 5',
					email: 'testing_email@kansharewards.com',
					department: 'X',
					job_title: 'Person',
					user_type: 'admin',
					org_name: 'Organization 3',
				});
			expect(body.user_id).toBe(5);
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
				const { status } = await request(server).delete('/employees/4');
				expect(status).toBe(204);
			});
		});

		describe('PUT /employees:id', () => {
			it('should edit an employee by id', async () => {
				const { body } = await request(server)
					.put('/employees/4')
					.send({
						last_name: 'User 100',
						job_title: 'Will be deleted',
					});
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: 4,
							sub: '4',
							first_name: 'Test',
							last_name: 'User 100',
							department: 'X',
							profile_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
							email: 'test.user3@kansharewards.com',
							job_title: 'Will be deleted',
							user_type: 'standard',
							org_id: 2,
							org_name: 'Organization 2',
						},
					]),
				);
			});
		});

		describe.skip('GET /employees/:id', () => {
			it('should fetch one employee', async () => {
				const { body } = await request(server).get('/employees/4');
				expect(body).toMatchObject({
					id: 4,
					user_id: 4,
					first_name: 'Test',
					last_name: 'User 4',
					email: 'test.user3@kansharewards.com',
					org_id: 2,
					department: 'X',
					profile_picture:
						'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
					job_title: 'Job Title',
					user_type: 'standard',
					org_name: 'Organization 2',
				});
			});
		});
	});
});
