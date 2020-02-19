exports.up = function(knex) {
	return knex.schema.createTable('Employees', function(tbl) {
		tbl.increments();
		tbl.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('Users')
			.onUpdate('CASCADE')
			.onDelete('RESTRICT');
		tbl.integer('org_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('Organizations')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl.varchar('ext_id');
		tbl.string('job_title');
		tbl.string('user_type').notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('Employees');
};
