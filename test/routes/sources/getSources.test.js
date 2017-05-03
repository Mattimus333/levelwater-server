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

describe('GET /sources/:id', () => {
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
    .get('/sources/1')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect(200, [{
      id: 1,
      water_systems_id: 1,
      source_name: 'First Street Well',
      source_type: 'gw',
      critical_to_operations: 'true',
      treatment: 'true',
      year_constructed: 1999,
      capacity: 100,
      condition: 'great',
      continuous_chlorination: 'false'
    }], done);
  });

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .get('/sources/1')
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 400 and Water system not found if id does not exist', done => {
    request
    .get('/sources/3000')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });

  it('should respond with 400 and Water system not found if wrong id', done => {
    request
    .get('/sources/2')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });
});
