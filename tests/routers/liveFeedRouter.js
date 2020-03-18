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
							profile_picture: expect.stringContaining('https'),
							email: 'test.user2@kansharewards.com',
							recipient: 1,
							sender: 2,
							message: 'POST test message',
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: 1,
							org_name: 'Organization 1',
							recipient_last: 'User 1',
							recipient_first: 'Test',
							recipient_picture: expect.stringContaining('https'),
						},
					]),
				);
			});
		});
	});
};
