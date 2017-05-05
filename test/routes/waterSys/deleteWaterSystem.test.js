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

describe('DELETE /water-systems/:id', () => {
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

  it('Throws an an error if the user is not linked to the water system they want to delete', (done) => {
    request
    .delete('/water-systems/2')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  });

  it('Throws an an error if the water system doesnt exist', (done) => {
    request
    .delete('/water-systems/200')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
  })

  it('Deletes the water system', (done) => {
    request
    .delete('/water-systems/1')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect(200, '1')
    .then(() => {
      knex('water_systems')
      .where('id', 1)
      .then((waterSystem) => {
        expect(waterSystem).to.have.lengthOf(0);
        // expect(directors).to.deep.include(newDirector);
      });
    });
    done();
  });
});
