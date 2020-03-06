const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	describe.skip('pic router', () => {
		describe('POST /profile-pic', () => {
			it('post new pic', async () => {
				const { body } = await request(server).get('./pic');
			});
		});
	});
};
