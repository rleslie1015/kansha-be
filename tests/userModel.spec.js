const knex = require('knex')
const knexConfig = require('../knexfile')
const Rec = require('../api/user/userModel');
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

describe('insert()', () => {
    it('should add a user to the database', async () => {
        const empty = await db('Users');
        expect(empty).toHaveLength(0);
    
    });
});