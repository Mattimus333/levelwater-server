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

describe('POST /treatment', () => {
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
    .post('/treatment')
    .set('token', token)
    .send({
      treatment_name: 'Cool Treatment Plant',
      treatment_type: 'ion-exchange',
      year_constructed: 2016,
      capacity: 300000,
      condition: 'great',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  it('requires treatment type', (done) => {
    request
    .post('/treatment')
    .set('token', token)
    .send({
      water_systems_id: 1,
      treatment_name: 'Cool Treatment Plant',
      year_constructed: 2016,
      capacity: 300000,
      condition: 'great',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  it('requires treatment name', (done) => {
    request
    .post('/treatment')
    .set('token', token)
    .send({
      water_systems_id: 1,
      treatment_type: 'ion-exchange',
      year_constructed: 2016,
      capacity: 300000,
      condition: 'great',
      critical_to_operations: 'true',
    })
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  // it('responds with JSON with a correct token', done => {
  //   request
  //   .post('/treatment')
  //   .set('token', token)
  //   .send({
  //     pws_id: 345345,
  //     pws_name: 'Stoney System',
  //     population: 3000,
  //     connections: 400,
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect(200, {
  //     pws_id: 345345,
  //     pws_name: 'Stoney System',
  //     population: 3000,
  //     connections: 400,
  //     id: 4,
  //   }, done);
  // });
  // 
  // it('Denies requests that dont have a token', done => {
  //   request
  //   .post('/treatment')
  //   .send({
  //     pws_id: 345345,
  //     pws_name: 'Stoney System',
  //     population: 3000,
  //     connections: 400,
  //   })
  //   .expect('Content-Type', /json/)
  //   .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  // });
});
