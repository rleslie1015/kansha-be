const request = require('supertest');
const server = require('../server');
const Rec = require('../api/user/userRouter');

describe('GET /', () => {
    test.todo('shoulde return status 200'), () => {
        return request(server).get('/users/')
            .expect(200)
          
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
    }
});

describe('POST /', () => {
    test.todo('should add a user'), () => {

    }
}) 