const testdb = require('../data/dbConfig');

module.exports = async () => {
	await testdb.migrate.rollback();
};
