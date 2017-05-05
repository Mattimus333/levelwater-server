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

  it('should require a water systems id', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      total_length_miles: 400,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Water systems id must not be blank' }, done);
  });


    it('should require water systems id to be a number', done => {
      request
      .post('/distribution-system')
      .set('token', token)
      .send({
        total_length_miles: 33,
        water_systems_id: 'Im a string',
        average_age_of_pipes: 65,
        average_main_diameter_inches: '12',
        condition: 'fair',
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Water systems id must not be blank' }, done);
    });

  it('should require a total length miles', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Total length must not be blank and must be a number' }, done);
  });

  it('should require a total length miles to be a number', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      total_length_miles: 'Wooo Im a string',
      water_systems_id: 1,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Total length must not be blank and must be a number' }, done);
  });

  it('should require an average age of pipes', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_length_miles: 400,
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Average age of pipes must not be blank and must be a number' }, done);
  });


  it('should require an average age of pipes to be a number', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 'Not an Int?!',
      average_main_diameter_inches: '12',
      condition: 'fair',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Average age of pipes must not be blank and must be a number' }, done);
  });

  it('should require condition', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 50,
      average_main_diameter_inches: '12',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: `Condition must not be blank and must be 'great', 'fair', or 'poor'` }, done);
  });

  it('should require condition be great, fair or poor', done => {
    request
    .post('/distribution-system')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_length_miles: 400,
      average_age_of_pipes: 50,
      average_main_diameter_inches: '12',
      condition: 'fairer',
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: `Condition must not be blank and must be 'great', 'fair', or 'poor'` }, done);
  });

    it('should require average main diameter', done => {
      request
      .post('/distribution-system')
      .set('token', token)
      .send({
        water_systems_id: 1,
        total_length_miles: 400,
        average_age_of_pipes: 50,
        condition: 'fair',
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: `Average main diameter must be a valid length in inches` }, done);
    });

    it('should require average main diameter be a valid length', done => {
      request
      .post('/distribution-system')
      .set('token', token)
      .send({
        water_systems_id: 1,
        total_length_miles: 400,
        average_age_of_pipes: 50,
        average_main_diameter_inches: '17',
        condition: 'fair',
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: `Average main diameter must be a valid length in inches` }, done);
    });

    it('Denies requests to reference water systems the user isnt connected to', done => {
      request
      .post('/distribution-system')
      .set('token', token)
      .send({
        water_systems_id: 3,
        total_length_miles: 400,
        average_age_of_pipes: 50,
        average_main_diameter_inches: '12',
        condition: 'fair',
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
    });
});
