const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const db = require('../data/dbConfig');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
module.exports.validateToken = expressJwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: process.env.SIGNING_CERT_URL,
	}),

	// Validate the audience and the issuer.
	audience: process.env.CLIENT_ID,
	issuer: process.env.DOMAIN,
	algorithms: ['RS256'],
});

module.exports.validateId = (req, res, next) => {
	const { sub } = req.user;
	db('Users')
		.where({sub})
		.limit(1)
		.then(([user]) => {
			if (!user) {
				console.log('user');
				res.status(200).json({ user: false });
			} else {
				req.profile = user;
				next();
			}
		});
};

module.exports.fixSSEToken = (req, res, next) => {
	req.headers.authorization = req.query.token;
	next();
};
