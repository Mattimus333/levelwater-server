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

describe('POST /sources TESTS', () => {
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

  it('requires water system id', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      source_name: '5th Street Well',
      source_type: 'gw',
      critical_to_operations: 'true',
      treatment: 'false',
      year_constructed: 1995,
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });
  //
  it('requires source name', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      critical_to_operations: 'true',
      treatment: 'false',
      year_constructed: 1995,
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Source name must not be blank' }, done);
  });

  it('requires source type', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      treatment: 'false',
      year_constructed: 1995,
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Source type must not be blank' }, done);
  });

  it('requires source type to be gw or sw', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'sss',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      treatment: 'false',
      year_constructed: 1995,
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Source type must not be blank' }, done);
  });

  it('requires year constructed', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      treatment: 'false',
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' }, done);
  });

  it('requires year constructed to be a valid year', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      year_constructed: 2018,
      treatment: 'false',
      capacity: 30,
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' }, done);
  });

  it('requires capacity', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      year_constructed: 2000,
      treatment: 'false',
      condition: 'fair',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Capacity must not be blank' }, done);
  });

  it('requires condition', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      year_constructed: 2001,
      treatment: 'false',
      capacity: 30,
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: `Condition must not be blank and must be 'great', 'fair', or 'poor'` }, done);
  });

  it('requires condition be great, fair or poor', (done) => {
    request
    .post('/sources')
    .set('token', token)
    .send({
      water_systems_id: 1,
      source_type: 'gw',
      source_name: '5th Street Well',
      critical_to_operations: 'true',
      year_constructed: 1998,
      treatment: 'false',
      capacity: 30,
      condition: 'WHATEVER',
      continuous_chlorination: 'true',
    })
    .expect({ status: 400, ErrorMessage: `Condition must not be blank and must be 'great', 'fair', or 'poor'` }, done);
  });
  //
  // it('requires critical to operations', (done) => {
  //   request
  //   .post('/treatment')
  //   .set('token', token)
  //   .send({
  //     water_systems_id: 1,
  //     treatment_name: 'Cool treatment type',
  //     capacity: 300000,
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     condition: 'great',
  //   })
  //   .expect({ status: 400, ErrorMessage: 'Critical to operations must not be blank and must be true or false' }, done);
  // });
  //
  // it('requires critical to operations be true or false', (done) => {
  //   request
  //   .post('/treatment')
  //   .set('token', token)
  //   .send({
  //     water_systems_id: 1,
  //     treatment_name: 'Cool treatment type',
  //     capacity: 300000,
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     condition: 'great',
  //     critical_to_operations: 'what?!',
  //   })
  //   .expect({ status: 400, ErrorMessage: 'Critical to operations must not be blank and must be true or false' }, done);
  // });
  //
  // it('responds with JSON with a correct token', done => {
  //   request
  //   .post('/treatment')
  //   .set('token', token)
  //   .send({
  //     water_systems_id: 1,
  //     treatment_name: 'Cool treatment type',
  //     capacity: 300000,
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     condition: 'great',
  //     critical_to_operations: 'true',
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect(200, {
  //     water_systems_id: 1,
  //     treatment_name: 'Cool treatment type',
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     capacity: 300000,
  //     condition: 'great',
  //     critical_to_operations: 'true',
  //     id: 4,
  //   }, done);
  // });
  // //
  // it('Denies requests that dont have a token', done => {
  //   request
  //   .post('/treatment')
  //   .send({
  //     water_systems_id: 1,
  //     treatment_name: 'Cool treatment type',
  //     capacity: 300000,
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     condition: 'great',
  //     critical_to_operations: 'true',
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  // });
  //
  // it('Denies requests to reference water systems the user isnt connected to', done => {
  //   request
  //   .post('/treatment')
  //   .set('token', token)
  //   .send({
  //     water_systems_id: 2,
  //     treatment_name: 'Cool treatment type',
  //     capacity: 300000,
  //     treatment_type: 'ion-exchange',
  //     year_constructed: 2016,
  //     condition: 'great',
  //     critical_to_operations: 'true',
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  // });
});
