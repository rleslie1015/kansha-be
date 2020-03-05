
exports.up = function(knex) {
  return knex.schema
    .createTable('Recognition', tbl => {
        tbl 
            .increments()
        tbl
            .integer('recipient')
            .notNullable()
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl
            .integer('sender')
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
            .datetime('date')
            .notNullable()
            
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Recognition')
};
