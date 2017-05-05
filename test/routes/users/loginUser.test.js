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

describe('POST /login', () => {
  let token;

  it('requires an email', (done) => {
    request
    .post('/login')
    .send({
      password: 'something',
    })
    .expect({ status: 400, errorMessage: 'Email must not be blank' }, done);
  });

  it('requires a password', (done) => {
    request
    .post('/login')
    .send({
      email: 'alex83@gmail.com',
    })
    .expect({ status: 400, errorMessage: 'Password must not be blank' }, done);
  });


  it('should respond with 400 and Email or Password is incorrect if they give bad email', done => {
    request
    .post('/login')
    .send({
      email: 'alex82@gmail.com',
      password: 'something',
    })
    .expect({ status: 400, ErrorMessage: 'Bad email or password' }, done);
  });

    it('should respond with 400 and Email or Password is incorrect if they give bad password', done => {
      request
      .post('/login')
      .send({
        email: 'alex82@gmail.com',
        password: 'somethingg',
      })
      .expect({ status: 400, ErrorMessage: 'Bad email or password' }, done);
    });

    it('should respond with 200 and return user info with correct credentials', done => {
      request
      .post('/login')
      .send({
        email: 'alex83@gmail.com',
        password: 'something',
      })
      .expect((res) => {
        delete res.body.token;
      })
      .expect({
        "first_name": "Axel",
        "last_name": "K",
        "id": 1,
        "email": "alex83@gmail.com",
        "superUser": "true",
        "water_systems_id": 1
      }, done);
    });
});
