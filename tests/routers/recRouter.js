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
			it('get specific recognition', async () => {
				const { body } = await request(server).get('/rec/1');
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

		describe('POST /rec/', () => {
			it('should successfully post a new recognition', async () => {
				const { status } = await request(server)
					.post('/rec')
					.send({
						recipient: 1,
						sender: 2,
						message: 'POST test message',
						date: '2020-03-01T06:00:00.000Z',
						badge_id: null,
						org_id: 1,
					});
				expect(status).toBe(201);
			});
		});
		describe('DELETE /rec/:id', () => {
			it('should delete a recognition successfully', async () => {
				const { status } = await request(server).delete('/rec/2');
				expect(status).toBe(204);
			});
		});
		describe('PUT /rec/:id', () => {
			it('should edit a recognition successfully', async () => {
				const { body } = await request(server)
					.put('/rec/1')
					.send({
						message: 'EDIT test message',
					});
				expect(body).toEqual(
					expect.objectContaining({
						message: 'EDIT test message',
					}),
				);
			});
		});
		describe.skip('GET /rec/admin', () => {
			it('should return recognitions for an entire organization', async () => {
				const { body } = await request(server).get('/rec/admin');
				console.log(body);
			});
		});
	});
};
