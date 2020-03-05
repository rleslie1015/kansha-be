const server = require('../../server');
const request = require('supertest');

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

describe('/profile router', () => {
	describe('GET /', () => {
		it.todo('something something dark side something');
	});
});
