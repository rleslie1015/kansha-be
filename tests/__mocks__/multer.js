const multer = require('multer');
module.exports = (() => {
	function multerMock() {
		return {
			single: jest.fn(() => {
				return jest.fn((req, res, next) => {
					req.resume();
					req.on('end', () => {
						req.file = {
							location: 'http://fake.url',
						};
						next();
						req.destroy();
						req.socket.destroy();
					});
				});
			}),
		};
	}
	multerMock.memoryStorage = multer.memoryStorage;
	multerMock.diskStorage = multer.diskStorage;
	multerMock.MulterError = multer.MulterError;
	return multerMock;
})();
