
exports.up = function(knex) {
  return knex.schema
    .createTable('Recognition', tbl => {
        tbl 
            .increments()
        tbl
            .string('recipient', 255)
            .notNullable()
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl
            .string('sender', 255)
            .notNullable()
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl
            .string('message', 500)
            .notNullable()
            .defaultTo('Thank you for your hard work! 🙃')
        tbl
            .date('date')
            .notNullable()
            .defaultTo(Date.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Recognition')
};
