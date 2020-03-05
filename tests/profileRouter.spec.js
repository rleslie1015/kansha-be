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

beforeAll(() => {
	return testdb.seed.run();
});
