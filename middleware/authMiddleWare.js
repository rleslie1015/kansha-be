const jwt = require('jsonwebtoken');
const request = require('request');
const dotenv = require('dotenv')
const userModel = require('../api/user/userModel')


dotenv.config()

module.exports = (req, res, next) => {

	const { authorization: accessToken } = req.headers;
    const { sub } = jwt.decode(accessToken);
    userModel.find({ sub })
    .then(user => {
        if (!user[0]) {
            console.log('user')
            res.status(200).json({user: false})
        } else {
            req.profile = user[0];
            next();
        }
    })
};
