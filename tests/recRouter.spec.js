const request = require('supertest');
const server = require('../server');
const Rec = require('../api/recognition/recModel');

describe('GET /', () => {
    it('shoulde return status 200', () => {
        return request(server)
            .get('/rec/')
            .then(response => {
                expect(response.status).toBe(200);
            });
    });

    test('should return JSON', async () => {
        const response = await request(server).get('/');

        expect(response.type).toMatch(/json/i);
    });
});

describe('GET /:id', () => {
    it('shoulde return status 200', () => {
        return request(server)
            .get('/rec/1')
            .then(response => {
                expect(response.status).toBe(200);
            });
    });

    test('should return JSON', async () => {
        const response = await request(server).get('/');

        expect(response.type).toMatch(/json/i);
    });
});

describe('POST /rec', function () {
    it('responds with json', function (done) {
        request(server)
            .post('/rec/')
            .send({ recipient: 1, sender: 2, message: 'Go be a popcicle!', date: '2019/11/13' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

