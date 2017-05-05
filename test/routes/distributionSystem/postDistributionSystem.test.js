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

describe('POST /distribution-system', () => {
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

  it('responds with JSON', (done) => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect(200, {
      id: 4,
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    }, done);
  });

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .post('/distribution-system')
    .send({
      id: 4,
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  // it('should respond with 400 and Water system not found if id does not exist', done => {
  //   request
  //   .get('/distribution-system/3000')
  //   .set('token', token)
  //   .expect('Content-Type', /json/)
  //   .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  // });
  //
  // it('should respond with 400 and Water system not found if wrong id', done => {
  //   request
  //   .get('/distribution-system/2')
  //   .set('token', token)
  //   .expect('Content-Type', /json/)
  //   .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  // });
});
