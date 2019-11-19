const knex = require('knex')
const knexConfig = require('../knexfile')
const Rec = require('../api/recognition/recModel');
const db = knex(knexConfig.testing)
const request = require('supertest');

describe('recognition model', () => {
    beforeEach(async () => {
        await db('Recognition').truncate();
    })
    it('should see test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
}) 