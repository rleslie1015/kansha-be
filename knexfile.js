// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
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
    seeds: { directory: './data/seeds' },
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
    seeds: { directory: './data/seeds' },
    pool: {
			min: 2,
			max: 10,
		},
  },
  testing: {
		client: 'pg',
		connection: {
			host: process.env.TEST_DB_HOST,
			user: process.env.TEST_DB_USER,
			password: process.env.TEST_DB_PASS,
			database: 'kansha_test',
			options: {
				port: process.env.TEST_DB_PORT,
			},
		},
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './tests/seeds',
		},
		pool: {
			min: 2,
			max: 75,
		},
	},
};
