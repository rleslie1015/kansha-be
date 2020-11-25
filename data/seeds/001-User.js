exports.seed = function(knex) {
	return knex('Users').insert([
		{
			sub: '1',
			first_name: 'Matt',
			last_name: 'Masters',
			department: 'Department of Gods',
		},
		{
			sub: '2',
			first_name: 'Ty',
			last_name: 'Lippe',
			department: 'Department of Devs',
		},
		{
			sub: '3',
			first_name: 'Andrew',
			last_name: 'Goenner',
			department: 'Department of Popcicles',
		},
	]);
};
