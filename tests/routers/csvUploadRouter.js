const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe('/csvUpload router', () => {
		describe('POST /csv', () => {
			it('successfully posts csv file', async () => {
				const { body } = await request(server)
					.post('/csv')
					.attach('bulkupload', './tests/test-csv-file.csv');

				expect(body).toEqual(
					expect.objectContaining({
						message: 'Successfully uploaded 6 users',
						userArray: expect.arrayContaining([
							{
								first_name: 'John',
								last_name: 'Doe',
								email: 'johndoe@email.com',
								job_title: 'manager',
								ext_id: '896T',
							},
						]),
					}),
				);
			});
		});
	});
};
