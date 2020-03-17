exports.up = function(knex) {
	return knex.schema.createTable('TeamMembers', function(tbl) {
		tbl.increments();
		tbl.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('Users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl.integer('team_id')
			.notNullable()
			.references('id')
			.inTable('Teams')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl.string('team_role').notNullable();
		tbl.boolean('active').defaultTo(true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('TeamMembers');
};
