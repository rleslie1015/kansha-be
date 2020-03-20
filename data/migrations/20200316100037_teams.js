exports.up = function(knex) {
	return knex.schema.createTable('Teams', function(tbl) {
		tbl.increments();
		tbl.string('name').notNullable();
		tbl.integer('org_id')
			.notNullable()
			.references('id')
			.inTable('Organizations')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('Teams');
};
