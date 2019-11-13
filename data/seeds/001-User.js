
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        { first_name: 'Matt', last_name: 'Masters', email: 'matt@mattmasters.dev', password: 'IamMatt!123', job_title: 'Dev God', department: 'Department of Gods', org_name: 'Ion', user_type: 'Admin'},
        { first_name: 'Ty', last_name: 'Lippe', email: 'ty@tylippe.dev', password: 'IamTy!123', job_title: 'Dev Apprentice', department: 'Department of Devs', org_name: 'Ion', user_type: 'Mod'},
        { first_name: 'Andrew', last_name: 'Goenner', email: 'andrew@andrewgoenner.dev', password: 'IamAndrew!123', job_title: 'Dev Popcicle', department: 'Department of Popcicles', org_name: 'Ion', user_type: 'Standard'}
      ]);
    });
};
