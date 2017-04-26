'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const knex = require('../../../knex');
const expect = require('chai').expect;
const app = require('../../../server');

describe('controllers', () => {

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

    after(function(done) {
      knex.migrate.rollback()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  describe('', () => {

    describe('GET /', () => {

      it('should respond with a status code of 200', done => {
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
