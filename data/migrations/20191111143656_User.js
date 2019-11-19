
exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
        tbl
            .increments()

        tbl
            .integer('auth0_id')
            .notNullable()
            
        tbl
            .string('first_name', 255)
            .notNullable()
        tbl
            .string('last_name', 255)
            .notNullable()

        tbl
            .string('job_title', 255)
            .notNullable()
        tbl 
            .string('department', 255)
        tbl 
            .string('org_name', 255)
            .notNullable()
        tbl 
            .string('user_type')
            .defaultTo('standard')
            .notNullable()
        tbl
            .string('profile_picture', 500)
            .defaultTo('https://www.sackettwaconia.com/wp-content/uploads/default-profile.png')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users')
};
