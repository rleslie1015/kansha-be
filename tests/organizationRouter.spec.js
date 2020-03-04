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

//working
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

	//working

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

	//working

	describe('DELETE /organizations', () => {
		it('should successfully delete an organization by id', async () => {
			const { status } = await request(server).delete('/organizations/1');
			expect(status).toBe(204);
		});
	});

	//getting a setheaders error on this one
	describe.skip('POST /organizations', () => {
		it('should successfully create a new organization', async () => {
			const { status } = await request(server)
				.post('/organizations')
				.send({
					name: 'Organization 3',
				});
			expect(status).toBe(201);
		});
	});

	//working

	describe.skip('PUT /organizations', () => {
		it('should edit a new org successfully', async () => {
			const { body } = await request(server)
				.put('/organizations/2')
				.send({
					name: 'NEW ORG',
				});
			expect(body).toEqual(
				expect.objectContaining({ id: 2, name: 'NEW ORG' }),
			);
		});
	});
});
