const server = require('../../server');
const request = require('supertest');

module.exports = () => {
	//need to do research to understand how to test what we get back from s3
	describe.skip('pic router', () => {
		describe('POST /profile-pic', () => {
			it('post new pic', async () => {
				const { file } = await request(server)
					.post('/profile-pic')
					.send({
						url:
							'https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png',
					});
				console.log(file);
				// expect(file).toEqual(
				// 	expect.objectContaining({
				// 		url: expect.any(String),
				// 	}),
				// );
			});
		});
	});
};
