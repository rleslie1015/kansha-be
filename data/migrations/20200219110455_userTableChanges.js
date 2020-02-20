exports.up = function(knex) {
	return knex.schema.table('Users', function(tbl) {
		tbl.dropColumn('job_title');
		tbl.dropColumn('user_type');
		tbl.dropColumn('org_name');
		tbl.string('email', 128);
	});
};

exports.down = function(knex) {
	return knex.schema.table('Users', function(tbl) {
		tbl.string('job_title');
		tbl.string('user_type');
		tbl.string('org_name');
		tbl.dropColumn('email');
	});
};
