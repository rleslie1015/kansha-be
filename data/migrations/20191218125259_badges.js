exports.up = function(knex) {
	return knex.schema
		.createTable('Badges', tbl => {
			tbl.increments();
			tbl.string('badge_name').notNullable();
			tbl.string('badge_URL').notNullable();
		})
		.table('Recognition', tbl => {
			tbl.integer('badge_id')
				.references('id')
				.inTable('Badges')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema
		.table('Recognition', tbl => {
			tbl.dropColumn('badge_id');
		})
		.dropTableIfExists('Badges');
};
