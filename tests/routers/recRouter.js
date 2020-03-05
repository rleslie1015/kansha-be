const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('recognition router', () => {
		describe('GET /rec', () => {
			it('get all recognitions ', async () => {
				const { body } = await request(server).get('/rec');
				console.log(body);
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: 1,
							recipient: 1,
							sender: 2,
							message: 'Sample Message',
							date: '2020-03-01T06:00:00.000Z',
							badge_id: null,
							org_id: null,
						},
					]),
				);
			});
		});
		describe('GET /rec/:id', () => {
			it.todo('get specific recognition');
		});
		describe('GET /rec/admin', () => {
			it.todo('should return recognitions for an entire organization');
		});
		describe('POST /rec/', () => {
			it.todo('should successfully post a new recognition');
		});
		describe('DELETE /rec/:id', () => {
			it.todo('should delete a recognition successfully');
		});
		describe('PUT /rec/:id', () => {
			it.todo('should edit a recognition successfully');
		});
	});
};
