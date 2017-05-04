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

describe('POST /water-systems', () => {
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

  it('requires pws name', (done) => {
    request
    .post('/water-systems')
    .set('token', token)
    .send({
      pws_id: 345345,
      population: 11000,
      connections: 3,
    })
    .expect({ status: 400, ErrorMessage: 'PWS name must not be blank' }, done);
  });

  it('requires pws id', (done) => {
    request
    .post('/water-systems')
    .set('token', token)
    .send({
      pws_name: 'Stoney System',
      population: 11000,
      connections: 3,
    })
    .expect({ status: 400, ErrorMessage: 'PWS id must not be blank' }, done);
  });

  it('requires population', (done) => {
    request
    .post('/water-systems')
    .set('token', token)
    .send({
      pws_id: 345345,
      pws_name: 'Stoney System',
      connections: 3,
    })
    .expect({ status: 400, ErrorMessage: 'Population must not be blank' }, done);
  });

  it('requires connections', (done) => {
    request
    .post('/water-systems')
    .set('token', token)
    .send({
      pws_id: 345345,
      pws_name: 'Stoney System',
      population: 3000,
    })
    .expect({ status: 400, ErrorMessage: 'Connections must not be blank' }, done);
  });

  it('responds with JSON with a correct token', done => {
    request
    .post('/water-systems')
    .set('token', token)
    .send({
      pws_id: 345345,
      pws_name: 'Stoney System',
      population: 3000,
      connections: 400,
    })
    .expect('Content-Type', /json/)
    .expect(200, {
      pws_id: 345345,
      pws_name: 'Stoney System',
      population: 3000,
      connections: 400,
      id: 4,
    }, done);
  });

  it('Denies requests that dont have a token', done => {
    request
    .post('/water-systems')
    .send({
      pws_id: 345345,
      pws_name: 'Stoney System',
      population: 3000,
      connections: 400,
    })
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });
});
