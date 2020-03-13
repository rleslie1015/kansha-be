const server = require('../../server');
const request = require('supertest');
const multer = require('multer');

jest.mock('multer', () => ({}));

// multer.single.mockImplementation(param => console.log(param));

module.exports = () => {
	//need to do research to understand how to test what we get back from s3
	describe('pic router', () => {
		describe('POST /profile-pic', () => {
			it('post new pic', async () => {
				const { file } = await request(server)
					.post('/profile-pic')
					.attach('image', './tests/avatarblank.png');
				// expect(file).toEqual(
				// 	expect.objectContaining({
				// 		url: expect.any(String),
				// 	}),
				// );
			});
		});
	});
};
