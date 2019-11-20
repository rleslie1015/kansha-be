const request = require('supertest');
const server = require('../server');
const Rec = require('../api/recognition/recModel');

describe('GET /', () => {
    test.todo('shoulde return status 200'), () => {
        return request(server).get('/rec/')
            .expect(200)
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
    }
});

describe('POST /', () => {
    test.todo('should add a recognition'), () => {

    }
})