
exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
        tbl
            .increments()
        tbl
            .string('first_name', 255)
            .notNullable()
        tbl
            .string('last_name', 255)
            .notNullable()
        tbl
            .string('email', 255)
            .notNullable()
            .unique()
        tbl
            .string('password', 255)
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
            .defaultTo('https://kansha-bucket.s3-us-west-1.amazonaws.com/avatarblank.png')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users')
};
