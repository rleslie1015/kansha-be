const Pic = require('../api/profile-pic/picRouter');
const request = require('supertest');
const server = require('../server');

describe('POST /profile-pic', function () {
    it('responds with json', function (done) {
        request(server)
            .post('/profile-pic')
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