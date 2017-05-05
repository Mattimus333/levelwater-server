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

describe('DELETE /distribution-system/:water_systems_id', () => {
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

  it('throws an error for incorrect water system id', done => {
    request
      .delete('/distribution-system/10001')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect({ 'status': 400, 'ErrorMessage': 'Distribution system not found!' }, done);
  });

  it('deletes a user and its information, returns id of deleted distribution system', done => {
    request
      .delete('/distribution-system/1')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200, '1', done);
  });

  it('throws an error when deleting an incorrect water system id', done => {
    request
      .delete('/distribution-system/3')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect({ 'status': 400, 'ErrorMessage': 'Distribution system not found!' }, done);
  });

});
