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

describe('POST /users', () => {
  let token;

  it('requires an email', (done) => {
    request
    .post('/users')
    .send({
      password: 'something',
    })
    .expect({ status: 400, errorMessage: 'Email must not be blank' }, done);
  });

  it('requires a password', (done) => {
    request
    .post('/users')
    .send({
      email: 'alex82@gmail.com',
    })
    .expect({ status: 400, errorMessage: 'Password must be at least 8 characters long' }, done);
  });

  it('responds with JSON', done => {
    request
    .post('/users')
    .send({
      first_name: "Dino",
      last_name: "Mite",
      email: "mmuhr88@gmail.com",
      superuser: "true",
      password: "dinomite123"
    })
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('rejects a post if the user email already exists', (done) => {
    request
    .post('/users')
    .send({
      email: 'alex83@gmail.com',
      password: 'something',
      first_name: 'Alex',
      last_name: 'K-Daddy',
      superuser: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Email already exists' }, done);
  });

  it('rejects a post if the password is too short', (done) => {
    request
    .post('/users')
    .send({
      email: 'alex834@gmail.com',
      password: 'some',
      first_name: 'Alex',
      last_name: 'K-Daddy',
      superuser: 'true',
    })
    .expect({ status: 400, errorMessage: 'Password must be at least 8 characters long' }, done);
  });

  it('rejects a post if the email is not valid email format', (done) => {
    request
    .post('/users')
    .send({
      email: 'alex8gmail.com',
      password: 'something',
      first_name: 'Alex',
      last_name: 'K-Daddy',
      superuser: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Improper email format' }, done);
  });
});
