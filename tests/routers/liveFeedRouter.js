const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('/livefeed router', () => {
		describe('GET /feed', () => {
			it('should display all items in feed', async () => {
				const { body } = await request(server).get('/feed');
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: 5,
							sub: '2',
							first_name: 'Test',
							last_name: 'User 2',
							department: 'X',
							profile_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
							email: 'test.user2@kansharewards.com',
							recipient: 1,
							sender: 2,
							message: 'POST test message',
							date: '2020-03-01T08:00:00.000Z',
							badge_id: null,
							org_id: 1,
							org_name: 'NEW ORG',
							recipient_last: 'User 1',
							recipient_first: 'Test',
							recipient_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
						},
					]),
				);
			});
		});
	});
};
