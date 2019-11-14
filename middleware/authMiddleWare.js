const jwt = require('jsonwebtoken');
const request = require('request');
const dotenv = require('dotenv')
const userModel = require('../api/user/userModel')


dotenv.config()

module.exports = (req, res, next) => {

	const { authorization: accessToken } = req.headers;
	const decodedToken = jwt.decode(accessToken);

	var options = {
		method: 'GET',
		url: `https://kansha.auth0.com/api/v2/users/${decodedToken.sub}`,
		headers: { authorization: `Bearer ${process.env.MGMT_TOKEN}` },
	};

	request(options, (error, response, body) => {
        if (error) throw new Error(error);
        const { email } = body;
        userModel.find({ email })
        .first()
        .then(user => {
            if (user) {
                res.status(200).json({user: false})
            } else {
                next();
            }
        })
	});
};
