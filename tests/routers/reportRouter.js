const server = require('../../server');
const request = require('supertest');

module.exports = () =>
	describe('/reports router', () => {
		describe('GET /reports/', () => {
			it('returns all reports', async () => {
				const { body } = await request(server).get('/reports');
				expect(body).toEqual(2);
			});
		});

		describe('GET /reports/top', () => {
			it('returns newest report', async () => {
				const { body } = await request(server).get('/reports/top');
				expect(body).toEqual(
					expect.objectContaining({
						count: expect.any(Number),
						employees: expect.arrayContaining([
							{
								first_name: 'Test',
								last_name: 'User 2',
								sender: 2,
								profile_picture: expect.any(String),
								count: '2',
							},
						]),
					}),
				);
			});
		});

		describe('GET /reports/engagement', () => {
			it('returns employee engagement', async () => {
				const { body } = await request(server).get(
					'/reports/engagement',
				);
				expect(body).toEqual(
					expect.objectContaining({
						numberOfPeople: expect.any(Number),
						numberOfPeopleInOrg: expect.any(Number),
						percentThanked: expect.any(Number),
					}),
				);
			});
		});

		describe('GET /reports/range', () => {
			it('returns all reports in a certain range', async () => {
				const { body } = await request(server).get('/reports/range');
				expect(body).toEqual(
					expect.objectContaining({
						count: expect.any(Number),
						results: expect.objectContaining({
							March: expect.any(Number),
						}),
					}),
				);
			});
		});
	});
