const testdb = require('../data/dbConfig');

module.exports = async () => {
	await testdb.migrate.latest();
	await testdb.seed.run();
};
