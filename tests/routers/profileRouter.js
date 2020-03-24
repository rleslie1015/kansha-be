const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('/profile router', () => {
		describe('GET /profile', () => {
			it('should return a profile object', async () => {
				const { body } = await request(server).get('/profile/1');
				expect(body).toMatchObject({
					peer: {
						email: expect.any(String),
						first_name: expect.any(String),
						id: expect.any(Number),
						job_title: expect.any(String),
						last_name: expect.any(String),
						org_id: expect.any(Number),
						org_name: expect.any(String),
						profile_picture: expect.any(String),
						rec: [
							{
								badge_id: null,
								date: expect.stringContaining('2020-03-01'),
								first_name: expect.any(String),
								id: expect.any(Number),
								last_name: expect.any(String),
								message: expect.any(String),
								org_id: expect.any(Number),
								profile_pic: expect.any(String),
								recipient: expect.any(Number),
								sender: expect.any(Number),
							},
							{
								badge_id: null,
								date: expect.stringContaining('2020-03-01'),
								first_name: expect.any(String),
								id: expect.any(Number),
								last_name: expect.any(String),
								message: expect.any(String),
								org_id: expect.any(Number),
								profile_pic: expect.any(String),
								recipient: expect.any(Number),
								sender: expect.any(Number),
							},
						],
						teams: [
							{
								member_id: expect.any(Number),
								name: expect.any(String),
								team_id: expect.any(Number),
								team_role: expect.any(String),
							},
						],
						user_type: expect.any(String),
					},
				});
			});
		});
	});
};
