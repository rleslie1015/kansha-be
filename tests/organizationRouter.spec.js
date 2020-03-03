// const server = require('../server');
// const request = require('supertest');
// const Org = require('../api/organization/organizationModel');
// const testdb = require('../data/dbConfig');

// const auth = require('../middleware/authMiddleWare');

// jest.mock('../middleware/authMiddleware.js');
// beforeEach(testdb);

// const token =
// 	'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUkVSVGhHTnpBek9USXpNelUwTlRKRE1ERkJORGMzT1RFMFFUZEdOVGRFT1RZeVJFSTRSQSJ9.eyJlbWFpbCI6ImFuZHJldy5hY2tlcnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8va2Fuc2hhLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMjkzNDU4MDU0NjMxMDg2MDk0MyIsImF1ZCI6Ijd6TEVMSEEzSnlydDdPNU01NjFIZ0JnM0VqUnNvVDVLIiwiaWF0IjoxNTgyNjQ1NDczLCJleHAiOjE1ODI2ODE0NzMsImF0X2hhc2giOiJpazVuTVUySURvV2xjcHZqdFFlNG9RIiwibm9uY2UiOiIxMjMxMjQxNDEzIn0.EmK6O2hescYqdJjbMPj34bc1YfFmNw0NoupnMv79wi5X9ICtfTx0Fia3WXj_JsqhXyk2mQYXnRiN7iwnlQF-TO6fQx6XKV7i0PLBZ22NMx6Iwcw0tQcTbutwHOT7PRWWMuztoUKKeit7IzCdEjiJWu6hR3P_XlsN9Eg6e4IfNq1l9-s1ir9lce2gV1liaBVak2MofwfArd0Wo1eHL7Eg_ceJC3rt0q91qv-E1zionoLne3_xJmPRCuyHGQPFi5-NKo4kNhP6jWzm3K3YLaG_vjsxGuy--1ay9l9wSFYClxukPE4K3KrMewZK6q3bwwCigYKKEbmdwpvYxYmjhBazYw';

// // need a way to mock router middleware so that it skips the logic and goes straight to next()
describe('GET /api/organizations', () => {
	it.skip('should return status 200', () => {
		// 	try {
		// 		// auth.validateToken.mockImplementationOnce((req, res, next) => {

		// 		// 	next();
		// 		// });
		console.dir(auth.validateToken);
		return request(server)
			.get('/organizations')
			.set('Authorization', token)

			.expect(200);
	});
});
