const request = require('supertest');
const server = require('../server');
const Org = require('../api/organization/organizationModel');

describe('GET /api/organizations', () => {
	it('should return status 200', () => {
		return request(server)
			.get('/organizations/')
			.then(response => {
				expect(response.status).toBe(200);
			});
	});
});
