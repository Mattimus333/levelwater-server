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

  it('deletes a user and its information', done => {
    request
      .delete('/users/1')
      .end((err, res) => {
        knex('users').then(users => {
          expect(users).to.have.lengthOf(0);
        })
        done();
        // below should only apply to water_systems delete tests because it is the central table
        // .then(() => {
        //   knex('water_systems')
        //     .where('director_id', res.body[0].id)
        //     .then(movies => {
        //       expect(movies).to.have.lengthOf(0);
        //       done();
        //     });
        // })
      });
  })
});
