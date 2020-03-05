// Update with your config settings.
require('dotenv').config();

module.exports = {
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},

	staging: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},

	testing: {
		client: 'pg',
		connection: 'postgresql://localhost:5432/postgres/kansha-test',
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './tests/seeds',
		},
		pool: {
			min: 2,
			max: 10,
		},
	},

	// testing: {
	// 	client: 'sqlite3',
	// 	connection: {
	// 		filename: './tests/test.db3',
	// 	},
	// 	useNullAsDefault: true,
	// 	migrations: {
	// 		directory: './data/migrations',
	// 	},
	// 	seeds: {
	// 		directory: './tests/seeds',
	// 	},
	// 	pool: {
	// 		min: 2,
	// 		max: 10,
	// 	},
	// 	pool: {
	// 		afterCreate: (conn, done) => {
	// 			conn.run('PRAGMA foreign_keys = ON', done);
	// 		},
	// 	},
	// 	log: {
	// 		warn() {},
	// 	},
	// },
};
