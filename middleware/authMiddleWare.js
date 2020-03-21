const router = require('express').Router();
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { editUser, find } = require('../api/user/userModel.js');

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
	try {
		const { sub, email, name } = req.user;
		// check if there is a user based on sub
		let [user] = await find({ 'Users.sub': sub });
		const search = email || name;
		if (!user) {
			// check if there is a user based on email
			user = await find({ email: search });

			if (!user) {
				// returns 200 so that onboarding can be accounted for.
				res.status(200).json({ user: false });
			} else {
				// adds sub if user is found by email
				await editUser(user.id, { sub });
				req.profile = user;
				next();
			}
		} else {
			if (!user.email) {
				// adds email address for legacy users
				await editUser(user.id, { email: search });
			}
			req.profile = user;
			next();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json(...err);
	}
};

router.use(fixSSEToken);
router.use(tokenValidator);

router.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).json({ message: err.message });
	}
	next();
});

module.exports.validateToken = router;
