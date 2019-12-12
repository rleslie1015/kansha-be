exports.up = function(knex) {
	return knex.schema.createTable('Reactions', tbl => {
        tbl.increments()
		tbl.integer('user_id')
			.notNullable()
			.references('id')
			.inTable('Users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		tbl.integer('rec_id')
			.notNullable()
			.references('id')
			.inTable('Users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('Reactions');
};
