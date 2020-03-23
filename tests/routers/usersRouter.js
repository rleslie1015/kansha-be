const server = require('../../server');
const request = require('supertest');

module.exports = () =>
	describe('/users router', () => {
		describe('GET /users', () => {
			it('should return array with users', async () => {
				const { body } = await request(server).get('/users');
				expect(body[0]).toMatchObject({
					id: expect.any(Number),
					first_name: expect.any(String),
					last_name: expect.any(String),
					profile_picture: expect.any(String),
					email: expect.any(String),
					job_title: expect.any(String),
					user_type: expect.any(String),
					org_id: expect.any(Number),
					org_name: expect.any(String),
					teams: [{}],
				});
			});
		});

		describe('GET /users/:id', () => {
			it('should return user', async () => {
				const { body } = await request(server).get('/users/1');
				expect(body).toMatchObject({
					id: expect.any(Number),
					first_name: expect.any(String),
					last_name: expect.any(String),
					profile_picture: expect.any(String),
					email: expect.any(String),
					job_title: expect.any(String),
					user_type: expect.any(String),
					org_id: expect.any(Number),
					org_name: expect.any(String),
					teams: [{}],
				});
			});
		});

		describe('POST /users', () => {
			it('should return updated user', async () => {
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
					.put('/users/3')
					.send({
						last_name: 'User 6',
						job_title: 'Will be deleted',
					});
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: expect.any(Number),
							first_name: expect.any(String),
							last_name: expect.any(String),
							profile_picture: expect.any(String),
							email: expect.any(String),
							job_title: expect.any(String),
							user_type: expect.any(String),
							org_id: expect.any(Number),
							org_name: expect.any(String),
							teams: [
								{
									team_id: expect.any(Number),
									member_id: expect.any(Number),
									name: expect.any(String),
									team_role: expect.any(String),
								},
							],
						},
					]),
				);
			});
		});
	});
