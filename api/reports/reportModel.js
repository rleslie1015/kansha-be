const db = require('../../data/dbConfig');

module.exports = {
	recognitionInfoForMyOrg,
};

async function recognitionInfoForMyOrg(org_id) {
	const recognitionInfo = await db('Recognition')
		.select('recipient', 'sender', 'date')
		.where({ org_id })
		.orderBy('date', 'desc');

	let { count } = await db('Recognition')
		.where({ org_id })
		.count()
		.first();
	count = Number(count);

	return {
		count,
		recognitionInfo,
	};
}
