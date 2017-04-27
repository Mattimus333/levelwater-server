'use strict';

process.env.NODE_ENV = 'test';

const app = require('../../../server');
const knex = require('../../../knex');
const request = require('supertest');
const expect = require('chai').expect;

describe('getUser', () => {

    before((done) => {
      knex.migrate.latest()
        .then(() => {
          return knex.seed.run()
            .then(() => {
              // below is hitting server.js with supertest. might need to change app to path of our routes index.
              request(app)
              // below path might be incorrect
                .post('/loginUser')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                // no below is wrong. need to login with seeded user info
                // maybe not, compare supseasonal and other API's vs bookshelf
                .send({
                  email: 'getUser@gmail.com',
                  password: 'getUserPW'
                })
                .end((err, res) => {
                  if (err) {
                    return done(err);
                  }

                  agent.saveCookies(res);
                  done();
                });
            })
            .catch((err) => {
                done(err);
            });
          });
    });

    after((done) => {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  describe('get requests for users table', () => {

    describe('GET /users/:id', () => {

      it('should respond with correct user info', done => {
        request(app)
        // I believe id should be 2 because we're only seeding one user before it - no
        // we want to get seeded user info, as we signed in with user
        .get('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          // expect all seeded user info below

        },done)
      })

      // erroneous login for this test
      it('', done => {
        request(app)
        .get('/users/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          // expect 404 page not found or 401, unauthorized
        }, done)
      })

      it('', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
        }, done)
      })

      it('', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {'status':404,'ErrorMessage':}, done)
      })

      it('should respond with 404 and Not Found if wrong id', done => {
        request(app)
        .get('/users/3000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })
  })
});
