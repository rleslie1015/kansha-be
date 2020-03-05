const server = require('../server');
const request = require('supertest');
const testdb = require('../data/dbConfig');

jest.mock('express-jwt', () => {
	return jest.fn(() => {
		return jest.fn((req, res, next) => {
			req.user = {
				sub: '1',
				org_id: '1',
				email: 'testing_email@kansharewards.com',
			};
			next();
		});
	});
});

afterEach(() => {
	jest.clearAllMocks();
});

beforeAll(async () => {
	await testdb.seed.run();
});
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
