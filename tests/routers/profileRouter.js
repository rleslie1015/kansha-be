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
						email: 'test.user1@kansharewards.com',
						first_name: 'Test',
						id: 1,
						job_title: 'Job Title',
						last_name: 'User 1',
						org_id: 1,
						org_name: 'NEW ORG',
						profile_picture:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						rec: [
							{
								badge_id: null,
								date: expect.stringContaining('2020-03-01'),
								first_name: 'Test',
								id: 1,
								last_name: 'User 2',
								message: 'EDIT test message',
								org_id: 1,
								profile_pic:
									'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
								recipient: 1,
								sender: 2,
							},
							{
								badge_id: null,
								date: expect.stringContaining('2020-03-01'),
								first_name: 'Test',
								id: 5,
								last_name: 'User 2',
								message: 'POST test message',
								org_id: 1,
								profile_pic:
									'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
								recipient: 1,
								sender: 2,
							},
						],
						sub: '1',
						user_type: 'admin',
					},
				});
			});
		});
	});
};
