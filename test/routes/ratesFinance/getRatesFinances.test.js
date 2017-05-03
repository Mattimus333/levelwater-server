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

describe('GET /rates-finances-fixedcosts/:id', () => {
  let token;

  it('creates a token', (done) => {
    request
    .post('/login')
    .send({
      email: 'alex83@gmail.com',
      password: 'something',
    })
    .end((err, res) => {
      expect(res.body.user.token);
      token = res.body.user.token;
    });
    done();
  });

  it('responds with JSON', done => {
    request
    .get('/rates-finances-fixedcosts/1')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect(200, [{
      id: 1,
      water_systems_id: 1,
      current_average_water_rate: 40,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    }], done);
  });

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .get('/rates-finances-fixedcosts/1')
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should respond with 400 and Water system not found if id does not exist', done => {
    request
    .get('/rates-finances-fixedcosts/3000')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });

  it('should respond with 400 and Water system not found if wrong id', done => {
    request
    .get('/rates-finances-fixedcosts/2')
    .set('token', token)
    .expect('Content-Type', /json/)
    .expect({ 'status': 400, 'ErrorMessage': 'Water system not found!' }, done);
  });
});
