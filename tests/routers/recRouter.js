const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('recognition router', () => {
		describe('GET /rec', () => {
			it('get all recognitions ', async () => {
				const { body } = await request(server).get('/rec');
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: expect.any(Number),
							recipient: expect.any(Number),
							sender: expect.any(Number),
							message: expect.any(String),
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: expect.any(Number),
						},
					]),
				);
			});
		});
		describe('GET /rec/:id', () => {
			it('get specific recognition', async () => {
				const { body } = await request(server).get('/rec/2');
				expect(body).toEqual(
					expect.arrayContaining([
						{
							id: expect.any(Number),
							recipient: expect.any(Number),
							sender: expect.any(Number),
							message: expect.any(String),
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: expect.any(Number),
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
						date: '2020-03-01',
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
						message: expect.any(String),
					}),
				);
			});
		});
		describe('GET /rec/admin', () => {
			it('should return recognitions for an entire organization', async () => {
				const { body } = await request(server).get('/rec/admin');
				expect(body.recognitions).toEqual(
					expect.arrayContaining([
						{
							id: expect.any(Number),
							sub: expect.any(String),
							first_name: expect.any(String),
							last_name: expect.any(String),
							department: expect.any(String),
							profile_picture: expect.any(String),
							email: expect.any(String),
							recipient: expect.any(Number),
							sender: expect.any(Number),
							message: expect.any(String),
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: expect.any(Number),
							org_name: expect.any(String),
							recipient_last: expect.any(String),
							recipient_first: expect.any(String),
							recipient_picture: expect.any(String),
						},
					]),
				);
			});
		});
	});
};
