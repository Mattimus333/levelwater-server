'use strict';

process.env.NODE_ENV = 'test';

const app = require('../../../server');
const knex = require('../../../knex');
const request = require('supertest')(app);
const expect = require('chai').expect;

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
  let token;

  it('requires a token', (done) => {
    request
    .post('/login')
    .send({
      email: 'alex83@gmail.com',
      password: 'something',
    })
    .end((err, res) => {
      expect(res.body.token);
      token = res.body.token;
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

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .get('/users/1')
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 401 and Unauthorized if id does not exist', done => {
    request
    .get('/users/3000')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 401 and Unauthorized if wrong id', done => {
    request
    .get('/users/2')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 200 and return user info', done => {
    request
    .get('/users/1')
    .set('token', token)
    .expect((res) => {
      delete res.body.token;
    })
    .expect({
      "first_name": "Axel",
      "last_name": "K",
      "id": 1,
      "email": "alex83@gmail.com",
      "superuser": "true",
      "water_systems_id": 1
    }, done);
  });
});
