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

describe('POST /storage-reservoirs TESTS', () => {
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

  it('must post valid water system id', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 101,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  it('must post valid water system id', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: -101,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  it('requires water system id', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: '',
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water systems id must not be blank' }, done);
  });

  it('requires reservoir type', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 101,
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Reservoir type must be valid' }, done);
  });

  it('must post valid reservoir type', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: -101,
      reservoir_type: 'jello',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Reservoir type must be valid' }, done);
  });

  it('must post valid reservoir name', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: -101,
      reservoir_type: 'concrete',
      year_constructed: 1929,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Reservoir name must not be blank' }, done);
  });

  it('year constructed must not be blank', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: -101,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' }, done);
  });

  it('year constructed must not be greater than current year', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: -101,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 2028,
      capacity: 1001,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' }, done);
  });

  it('capacity must not be blank', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Capacity must not be blank and must not be negative' }, done);
  });

  it('capacity must not be negative', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: -100,
      condition: 'poor',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Capacity must not be blank and must not be negative' }, done);
  });

  it('condition must not be blank', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 100,
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Condition must not be blank and must be great, fair, or poor' }, done);
  });

  it('condition must be valid', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 100,
      condition: 'weird',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Condition must not be blank and must be great, fair, or poor' }, done);
  });

  it('critical to operations must not be blank', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 100,
      condition: 'poor',
    })
    .expect({ status: 400, ErrorMessage: 'Critical to Operations status must be either true or false' }, done);
  });

  it('critical to operations must be valid', (done) => {
    request
    .post('/storage-reservoirs')
    .set('token', token)
    .send({
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'res name',
      year_constructed: 1929,
      capacity: 100,
      condition: 'poor',
      critical_to_operations: 'no',
    })
    .expect({ status: 400, ErrorMessage: 'Critical to Operations status must be either true or false' }, done);
  });
});
