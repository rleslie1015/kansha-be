exports.up = function(knex) {
	return knex.schema.alterTable('Users', function(tbl) {
		tbl.string('sub', 64)
			.nullable()
			.alter();
	});
};

exports.down = function(knex) {
	return knex.schema.alterTable('Users', function(tbl) {
		tbl.string('sub', 64)
			.notNullable()
			.alter();
	});
};
