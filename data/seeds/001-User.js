
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        { sub: '1', first_name: 'Matt', last_name: 'Masters', job_title: 'Dev God', department: 'Department of Gods', org_name: 'Ion', user_type: 'Admin'},
        { sub: '2', first_name: 'Ty', last_name: 'Lippe', job_title: 'Dev Apprentice', department: 'Department of Devs', org_name: 'Ion', user_type: 'Mod'},
        { sub: '3', first_name: 'Andrew', last_name: 'Goenner', job_title: 'Dev Popcicle', department: 'Department of Popcicles', org_name: 'Ion', user_type: 'Standard'}
      ]);
    });
};
