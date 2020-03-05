const server = require('../server');
const request = require('supertest');
const testdb = require('../data/dbConfig');

jest.mock('express-jwt', () => {
	return jest.fn(() => {
		return jest.fn((req, res, next) => {
			req.user = {
				sub: '5',
				email: 'testing_email@kansharewards.com',
			};
			next();
		});
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

beforeAll(async () => {
	await testdb.seed.run();
});

describe('/users router', () => {
	describe('GET /users', () => {
		it('should return array with users', async () => {
			const { body } = await request(server).get('/users');
			expect(body).toEqual(
				expect.arrayContaining([
					{
						id: 1,
						sub: '1',
						first_name: 'Test',
						last_name: 'User 1',
						department: 'X',
						profile_picture:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						email: 'test.user1@kansharewards.com',
						job_title: 'Job Title',
						user_type: 'admin',
						org_id: 1,
						org_name: 'Organization 1',
					},
				]),
			);
		});
	});

	describe('GET /users/:id', () => {
		it('should return user', async () => {
			const { body } = await request(server).get('/users/1');
			expect(body.length).toEqual(1);
			expect(body).toEqual(
				expect.arrayContaining([
					{
						id: 1,
						sub: '1',
						first_name: 'Test',
						last_name: 'User 1',
						department: 'X',
						profile_picture:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						email: 'test.user1@kansharewards.com',
						job_title: 'Job Title',
						user_type: 'admin',
						org_id: 1,
						org_name: 'Organization 1',
					},
				]),
			);
		});
	});

	describe('POST /users', () => {
		it('should return new user id', async () => {
			const { body } = await request(server)
				.post('/users')
				.send({
					first_name: 'Test',
					last_name: 'User 5',
					department: 'X',
					job_title: 'Person',
					user_type: 'admin',
					org_name: 'Organization 3',
				});
			expect(body[0]).toBe(5);
		});
	});

	describe('DELETE /users', () => {
		it('should return status code 204', async () => {
			const { status } = await request(server).delete('/users/4');
			expect(status).toBe(204);
		});
	});

	describe('PUT /users', () => {
		it('should return new user id', async () => {
			const { body } = await request(server)
				.put('/users/5')
				.send({ last_name: 'User 6', job_title: 'Will be deleted' });
			expect(body).toEqual(
				expect.arrayContaining([
					{
						id: 5,
						sub: '5',
						first_name: 'Test',
						last_name: 'User 6',
						department: 'X',
						profile_picture:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						email: 'testing_email@kansharewards.com',
						job_title: 'Will be deleted',
						user_type: 'admin',
						org_id: 3,
						org_name: 'Organization 3',
					},
				]),
			);
		});
	});
});
