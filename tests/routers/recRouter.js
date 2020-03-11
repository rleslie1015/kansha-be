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
							id: 1,
							recipient: 1,
							sender: 2,
							message: 'Sample Message',
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: 1,
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
							id: 2,
							recipient: 2,
							sender: 1,
							message: 'Sample Message',
							date: expect.stringContaining('2020-03-01'),
							badge_id: null,
							org_id: 1,
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
						message: 'EDIT test message',
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
							id: 1,
							sub: '2',
							first_name: 'Test',
							last_name: 'User 2',
							department: 'X',
							profile_picture:
								'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
							email: 'test.user2@kansharewards.com',
							recipient: 1,
							sender: 2,
							message: 'EDIT test message',
							date: expect.stringContaining('2020-03-01'),
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
