const server = require('../../server');
const request = require('supertest');

module.exports = () =>
	describe('/team router', () => {
		describe('GET /teams', () => {
			it('should return all Teams', async () => {
				const { body } = await request(server).get('/teams');
				expect(body).toEqual(
					expect.arrayContaining([
						{
							team_id: expect.any(Number),
							name: expect.any(String),
							count: expect.any(Number),
							managers: [
								{
									member_id: expect.any(Number),
									user_id: expect.any(Number),
									first_name: expect.any(String),
									last_name: expect.any(String),
								},
							],
						},
					]),
				);
			});
		});

		describe('GET /teams/:id', () => {
			it('should return one team by id', async () => {
				const { body } = await request(server).get('/teams/1');
				expect(body).toEqual({
					id: expect.any(Number),
					name: expect.any(String),
					team_members: [
						{
							id: expect.any(Number),
							user_id: expect.any(Number),
							first_name: expect.any(String),
							last_name: expect.any(String),
							profile_picture: expect.any(String),
						},
						{
							id: expect.any(Number),
							user_id: expect.any(Number),
							first_name: expect.any(String),
							last_name: expect.any(String),
							profile_picture: expect.any(String),
						},
					],
				});
			});
		});
		describe('POST /teams', () => {
			it('should create a new team', async () => {
				const { status } = await request(server)
					.post('/teams')
					.send({
						name: 'Team Three',
						newMembersArray: [{}],
					});
				expect(status).toBe(201);
			});
		});

		describe('POST /teams/:id', () => {
			it('should create a new team member', async () => {
				const { status } = await request(server)
					.post('/teams/3')
					.send({
						user_id: 5,
						team_role: 'manager',
					});
				expect(status).toBe(201);
			});
		});

		describe('DELETE', () => {
			it('should delete a team', async () => {
				const { status } = await request(server).delete('/teams/1');
				expect(status).toBe(204);
			});
		});

		describe('PUT /teams/:id', () => {
			it('should update a team by id', async () => {
				const { body } = await request(server)
					.put('/teams/2')
					.send({
						name: 'Team Awesome',
					});
				expect(body).toEqual(
					expect.objectContaining({
						name: 'Team Awesome',
					}),
				);
			});
		});

		describe('GET /teams/members/:id', () => {
			it('should fetch a team-member by id', async () => {
				const { body } = await request(server).get('/teams/members/3');
				expect(body).toMatchObject({
					id: expect.any(Number),
					user_id: expect.any(Number),
					team_id: expect.any(Number),
					team_role: expect.any(String),
					active: true,
					team_name: expect.any(String),
					first_name: expect.any(String),
					last_name: expect.any(String),
					profile_picture: expect.any(String),
				});
			});
		});

		describe('DELETE /teams/members/:id', () => {
			it('should delete a team-member', async () => {
				const { status } = await request(server).delete(
					`/teams/members/4`,
				);
				expect(status).toBe(204);
			});
		});

		describe('PUT /teams/members/:id', () => {
			it('should update a team-member', async () => {
				const { body } = await request(server)
					.put('/teams/members/3')
					.send({
						team_role: 'member',
						active: false,
					});
				expect(body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						user_id: expect.any(Number),
						team_id: expect.any(Number),
						team_role: expect.any(String),
						active: false,
						team_name: expect.any(String),
						first_name: expect.any(String),
						last_name: expect.any(String),
						profile_picture: expect.any(String),
					}),
				);
			});
		});
	});
