'use strict';

process.env.NODE_ENV = 'test';

const app = require('../../../server');
const knex = require('../../../knex');
const request = require('supertest');
const expect = require('chai').expect;

describe('getUser', () => {

    before((done) => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      })
      .then(() => {
          done();
      })
      .catch((err) => {
          done(err);
      });
    });

    after((done) => {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  describe('get requests for users table', () => {

    describe('GET /users/:id', () => {

      it('should respond with correct user info', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
      })

      it('should respond with a content type of json', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/, done)
      })
    });

    describe('GET /', () => {

      it('', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
        }, done)
      })

      it('', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
        }, done)
      })

      it('', done => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, {'status':404,'ErrorMessage':}, done)
      })

      it('should respond with 404 and Not Found if wrong id', done => {
        request(app)
        .get('/users/3000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({'status':404,'ErrorMessage':'Not Found'}, done)
      })

    });
  })
});
