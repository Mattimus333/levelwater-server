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
      .end((err, res) => {
        knex('users')
        .where('id', 10001)
        .then(user => {
          console.log('first', user);
          expect(user).to.have.lengthOf(0);
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

  it('test', done => {
    request
      .delete('/users/10001')
      .set('token', token)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).to.deep.equal({})
        done();
      });
        // below should only apply to water_systems delete tests because it is the central table
        // .then(() => {
        //   knex('water_systems')
        //     .where('director_id', res.body[0].id)
        //     .then(movies => {
        //       expect(movies).to.have.lengthOf(0);
        //       done();
        //     });
        // })
  })

  it('deletes a user and its information', done => {
    request
      .delete('/users/1')
      .end((err, res) => {
        knex('users')
        .where('id', 1)
        .then(user => {
          console.log(user);
          expect({});
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
