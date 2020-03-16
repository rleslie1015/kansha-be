const moment = require('moment');

module.exports = time => {
	const formatting = {
		months: ['[Week] w', 'w'],
		weeks: ['dddd', 'd'],
		years: ['MMMM', 'M'],
	};
	let day = moment();
	const map = new Map();
	const periods = time === 'years' ? 11 : time === 'months' ? 7 : 6;
	const [format, period] = formatting[time];
	map.set(day.format(format), 0);

	for (let i = 0; i < periods; i++) {
		day = day.subtract(1, period);
		map.set(day.format(format), 0);
	}

	return map;
};
