const server = require('../../server');
const request = require('supertest');

describe('/reactions router', () => {
	describe.skip('GET /reactions/:rec_id', () => {
		it('should return one reaction by id', async () => {
			const { body } = await request(server).get('/reactions/1');
			expect(body).toBe();
		});
	});
	describe('POST /reactions/', () => {
		it.todo('should successfully add a reaction to a recognition');
	});
	describe('DELETE /reactions/:id', () => {
		it.todo('should successfully delete a reaction on a recognition');
	});
});
