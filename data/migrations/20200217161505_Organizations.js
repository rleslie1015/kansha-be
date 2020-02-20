exports.up = function(knex) {
	return knex.schema.createTable('Organizations', function(tbl) {
		tbl.increments();
		tbl.string('name', 228).notNullable();
		tbl.string('company_size');
		tbl.string('industry');
		tbl.varchar('logo_url');
		tbl.varchar('primary_color');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('Organizations');
};
