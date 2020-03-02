const router = require('express').Router();
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const db = require('../data/dbConfig');
const { findAll, editUser } = require('../api/user/userModel.js');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const tokenValidator = expressJwt({
	// Dynamically provide a signing key
	// based on the id in the header and
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

const fixSSEToken = (req, res, next) => {
	req.headers.authorization = req.headers.authorization || req.query.token;
	next();
};

module.exports.validateId = async (req, res, next) => {
	const { sub, email, name } = req.user;
	let user = await findAll()
		.where({ sub })
		.first();
	if (!user) {
		const search = email || name;
		user = await findAll()
			.where({ email: search })
			.first();
		if (!user) {
			res.status(200).json({ user: false });
		} else {
			await editUser(user.id, { email });
			req.profile = user;
			next();
		}
	} else {
		req.profile = user;
		next();
	}
};

router.use(fixSSEToken);
router.use(tokenValidator);

module.exports.validateToken = router;
