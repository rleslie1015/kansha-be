module.exports = (...args) => {
	return (req, res, next) => {
		let valid = true;
		args.forEach(arg => {
			if (req.body[arg] === undefined) valid = false;
		});
		if (valid) next();
		else
			res.status(400).json({
				error: 'Missing required fields',
				requiredFields: JSON.stringify(args),
			});
	};
};
