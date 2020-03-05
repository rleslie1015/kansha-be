const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('/profile router', () => {
		describe('GET /profile', () => {
			it('should return an array of profiles', async () => {
				const { body } = await request(server).get('/profile');
				expect(body).toMatchObject({
					user: {
						department: 'X',
						email: 'testing_email@kansharewards.com',
						first_name: 'Test',
						id: 5,
						job_title: 'Person',
						last_name: 'User 5',
						org_id: 3,
						org_name: 'NEW ORG',
						profile_picture:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						rec: [],
						sub: '1',
						user_type: 'admin',
					},
				});
			});
		});
		describe.skip('GET /profile/:id', () => {
			it.todo('should return an array of profiles', async () => {
				const { body } = await request(server).get('/profile');
				expect(body).toEqual(expect.arrayContaining);
			});
		});
	});
};
