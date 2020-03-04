const server = require('../server');
const request = require('supertest');
const testdb = require('../data/dbConfig');

jest.mock('express-jwt', () => {
	return jest.fn(() => {
		return jest.fn((req, res, next) => {
			req.user = {
				sub: '1',
				org_id: 1,
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

describe('/organizations router', () => {
	describe.skip('GET /organizations/', () => {
		it('return all organizations', async () => {
			const { body } = await request(server).get('/organizations');
			expect(body).toEqual(
				expect.arrayContaining([
					{
						id: 1,
						name: 'Organization 1',
					},
				]),
			);
		});
	});

	//will use middleware

	describe.skip('GET /organizations/:id', () => {
		it('returns one organization with matching id', async () => {
			const { body } = await request(server).get('/organizations/1');
			expect(body).toMatchObject({
				id: 1,
				name: 'Organization 1',
				company_size: null,
				industry: null,
				logo_url: null,
				primary_color: null,
			});
		});
	});

	//will use middleware

	describe.skip('DELETE /organizations', () => {
		it('should successfully delete an organization by id', async () => {
			const { status } = await request(server).delete('/organizations/1');
			expect(status).toBe(204);
		});
	});

	describe('POST /organizations', () => {
		it('should successfully create a new organization', async () => {
			const { body } = await request(server)
				.post('/organizations')
				.send({
					name: 'Organization 3',
					company_size: null,
					industry: null,
					logo_url: null,
					primary_color: null,
				});
			expect(body.org_id).toBe(3);
		});
	});

	//will use middleware

	describe.skip('PUT /organizations', () => {
		it('should edit a new org successfully', async () => {
			const { body } = await (
				await request(server).put('/organizations/2')
			).send({
				id: 1,
				name: 'NEW ORG',
				company_size: null,
				industry: null,
				logo_url: null,
				primary_color: null,
			});
			expect(body).toMatchObject({ id: 1, name: 'NEW ORG' });
		});
	});
});
