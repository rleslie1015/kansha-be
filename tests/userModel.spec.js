const knex = require('knex')
const knexConfig = require('../knexfile')
const Users = require('../api/user/userModel');
const db = knex(knexConfig.testing)
const request = require('supertest');

describe('Users model', () => {
    beforeEach(async () => {
        await db('Users').truncate();
    })
    it('should see test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
}) 

describe('GET()', () => {
    it('should get user from the database', async () => {
        const User = await db('Users');
        expect(User).toHaveLength(0);



        const users = await db('Users')
        expect(users).toHaveLength(0);
    });
});

