const server = require('../../server');
const request = require('supertest');

//working
module.exports = () =>
	describe('/organizations router', () => {
		describe('GET /organizations/', () => {
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

		describe('GET /organizations/:id', () => {
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

		//working EXCEPT NEED TO TEST MIDDLEWARE. we can currently delete other orgs.

		describe('DELETE /organizations', () => {
			it('should successfully delete an organization by id', async () => {
				const { status } = await request(server).delete(
					'/organizations/1',
				);
				expect(status).toBe(204);
			});
		});

		//getting a setheaders error on this one
		describe('POST /organizations', () => {
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

		describe('PUT /organizations', () => {
			it('should edit a new org successfully', async () => {
				const { body } = await request(server)
					.put('/organizations/3')
					.send({
						name: 'NEW ORG',
					});
				expect(body).toEqual(
					expect.objectContaining({ id: 3, name: 'NEW ORG' }),
				);
			});
		});
	});
