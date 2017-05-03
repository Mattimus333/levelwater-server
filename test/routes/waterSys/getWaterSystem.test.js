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

describe('GET /water-systems/:id', () => {
  let token;

  it('creates a token', (done) => {
    request
    .post('/login')
    .send({
      email: 'alex83@gmail.com',
      password: 'something',
    })
    .end((err, res) => {
      expect(res.body.user.token);
      token = res.body.user.token;
    });
    done();
  });

  it('responds with JSON', done => {
    request
    .get('/water-systems/1')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect(200, {
      id: 1,
      pws_name: 'Drunk with power',
      pws_id: 1234567,
      population: 1000,
      connections: 444,
    }, done);
  });

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .get('/water-systems/1')
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 400 and Water system not found if id does not exist', done => {
    request
    .get('/water-systems/3000')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });

  it('should respond with 400 and Water system not found if wrong id', done => {
    request
    .get('/water-systems/2')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });
});
