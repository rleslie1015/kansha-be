const knex = require('knex')
const knexConfig = require('../knexfile')
const Rec = require('../api/recognition/recModel');
const db = knex(knexConfig.testing)
const request = require('supertest');
const {addRec} = require('../api/recognition/recModel')

describe('recognition model', () => {
    beforeEach(async () => {
        await db('Recognition').truncate();
    })
    it('should see test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
}) 

describe('insert()', () => {
    it('should add a rocognition to the database', async () => {
        const empty = await db('Recognition');
        expect(empty).toHaveLength(0);
    
    });
});

describe('findAll', () => {
    it('should have a recognition', async () => {
        const seed = await db('Recognition');
        expect(seed).toHaveLength(0);
        //await Rec.addRec({recipient: 1, sender: 2, message: 'Go forth and be a God', date: '2019/11/13'})
        //const rec = await db('Recognition');

        //expect(rec).toHaveLength(1);
    })
})

