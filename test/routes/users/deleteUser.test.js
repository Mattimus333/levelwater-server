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

describe('DELETE /users/:id', () => {
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

  it('throws an error for incorrect user id', done => {
    request
      .delete('/users/10001')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect({ 'status': 404, 'ErrorMessage': 'This user could not be found' }, done);
  });

  it('deletes a user and its information, returns id of deleted user', done => {
    request
      .delete('/users/1')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect(200, '1', done);
  });

  it('throws an error when deleting an incorrect user id', done => {
    request
      .delete('/users/3')
      .set('token', token)
      .expect('Content-Type', /json/)
      .expect({ 'status': 404, 'ErrorMessage': 'This user could not be found' }, done);
  });

});
