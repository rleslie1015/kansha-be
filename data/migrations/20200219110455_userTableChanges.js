exports.up = function(knex) {
	return knex.schema
		.table('Users', function(tbl) {
			tbl.dropColumn('job_title');
			tbl.dropColumn('department');
			tbl.dropColumn('user_type');
			tbl.dropColumn('org_name');
			tbl.string('email', 128);
		})
		.table('Recognition', function(tbl) {
			tbl.integer('org_id')
				.unsigned()
				.references('id')
				.inTable('Organizations')
				.onUpdate('CASCADE')
				.onDelete('RESTRICT');
		});
};

exports.down = function(knex) {
	return knex.schema.table('Users', function(tbl) {
		tbl.string('job_title');
		tbl.string('department');
		tbl.string('user_type');
		tbl.string('org_name');
		tbl.dropColumn('email');
	});
};
