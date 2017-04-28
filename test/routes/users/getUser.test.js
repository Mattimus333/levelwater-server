'use strict';

process.env.NODE_ENV = 'test';

const app = require('../../../server');
const knex = require('../../../knex');
const request = require('supertest');
const expect = require('chai').expect;

// suite('getUser', () => {

    // before((done) => {
    //   knex.migrate.latest()
    //     .then(() => {
    //       return knex.seed.run()
    //         .then(() => {
    //           done();
    //         }).then(() => {
    //           // below is hitting server.js with supertest. might need to change app to path of our routes index.
    //           request(app)
    //           // below path might be incorrect
    //             .post('/postUser')
    //             .set('Accept', 'application/json')
    //             .set('Content-Type', 'application/json')
    //             // no below is wrong. need to login with seeded user info
    //             // maybe not, compare supseasonal and other API's vs bookshelf
    //             .send({
    //                "email": "getUserTest@gmail.com",
    //                "password": "getUserTest",
    //                "first_name": "Fitzwilliam",
    //                "last_name": "Darcy",
    //                "water_systems_id": 1,
    //                "superuser": "true"
    //              })
    //             .end((err, res) => {
    //               if (err) {
    //                 return done(err);
    //               }
    //
    //               agent.saveCookies(res);
    //               done();
    //             });
    //         })
    //         .catch((err) => {
    //             done(err);
    //         });
    //       });
    // });
  describe('get requests for users table', () => {
    before((done) => {
        knex.migrate.latest()
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });

    beforeEach((done) => {
      knex.seed.run()
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
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


    describe('GET /users/:id', () => {

      it('should respond with correct user info', done => {
        request(app)
        // I believe id should be 2 because we're only seeding one user before it - no
        // we want to get seeded user info, as we signed in with user
        .get('/users/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          // expect all seeded user info below

        }, done)
      });

      // erroneous login for this test
      it('non existant user', done => {
        request(app)
        .get('/users/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          // expect 404 page not found or 401, unauthorized
        }, done)
      });

      it('existing user', done => {
        request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          // expect 404 page not found or 401, unauthorized
        }, done)
      });

      it('should respond with 404 and Not Found if wrong id', done => {
        request(app)
        .get('/users/3000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      });
    });
  });
// });
