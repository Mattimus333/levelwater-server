'use strict';

process.env.NODE_ENV = 'test';

const app = require('../../../server');
const knex = require('../../../knex');
const request = require('supertest')(app);
const expect = require('chai').expect;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

beforeEach((done) => {
  knex.migrate.latest().then(() => {
    knex.seed.run().then(() => {
      done();
    });
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});

describe('GET /users/:id', () => {
  let token = '';

  it('requires a token', (done) => {
    request
    .post('/login')
    .send({
      email: 'alex83@gmail.com',
      password: 'something',
    })
    // .expect((res) => {
    //   console.log('RES', res.body);
    // })
    // .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
    .end((err, res) => {
      expect(res.body.user.token);
      token = res.body.user.token;
    });
    done();
  });

  it('responds with JSON', done => {
    request
    .get('/users/1')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


//
//
//
//
//
//
//
//
//   describe('get requests for users table', () => {
//
//     describe('GET /users/:id', () => {
//
//       it('should respond with correct user info', done => {
//         request(app)
//         // I believe id should be 2 because we're only seeding one user before it - no
//         // we want to get seeded user info, as we signed in with user
//         .get('/users/2')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, {
//           // expect all seeded user info below
//
//         }, done)
//       });
//
//       // erroneous login for this test
//       it('non existant user', done => {
//         request(app)
//         .get('/users/5')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, {
//           // expect 404 page not found or 401, unauthorized
//         }, done)
//       });
//
//       it('existing user', done => {
//         request(app)
//         .get('/users/1')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, {
//           // expect 404 page not found or 401, unauthorized
//         }, done)
//       });
//
//       it('should respond with 404 and Not Found if wrong id', done => {
//         request(app)
//         .get('/users/3000')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect({'status':404,'ErrorMessage':'Not Found'}, done)
//       });
//     });
//   });
// // });
