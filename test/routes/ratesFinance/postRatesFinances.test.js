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

describe('POST /distribution-system', () => {
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

  it('responds with JSON', (done) => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 40.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect(200, {
      id: 4,
      water_systems_id: 1,
      current_average_water_rate: 40.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    }, done);
  });

  it('should respond with 401 and Unauthorized if no token', done => {
    request
    .post('/distribution-system')
    .send({
      water_systems_id: 1,
      current_average_water_rate: 40.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ 'status': 401, 'ErrorMessage': 'Unauthorized' }, done);
  });

  it('should require a water systems id', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      current_average_water_rate: 40.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Water systems id must not be blank and must be a number' }, done);
  });

  it('should require a water systems id to be a number', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 'Not a number',
      current_average_water_rate: 40.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Water systems id must not be blank and must be a number' }, done);
  });

  it('should require current average water rate', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Current average water rate must not be blank and must be a number' }, done);
  });

  it('should require current average water rate be a number', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 'Not a number',
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Current average water rate must not be blank and must be a number' }, done);
  });

  it('should require total financial reserves', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 1,
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Total financial reserves must not be blank and must be a number' }, done);
  });

  it('should require total financial reserves to be a number', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 1,
      total_financial_reserves: 'String',
      annual_revenue_water_sales: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Total financial reserves must not be blank and must be a number' }, done);
  });

  it('should require annual revenue water sales', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 1,
      total_financial_reserves: 50000,
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Annual revenue water sales must not be blank and must be a number' }, done);
  });

  it('should require annual revenue water sales to be a number', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 1,
      total_financial_reserves: 50000,
      annual_revenue_water_sales: 'String',
      annual_revenue_fees_charged: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Annual revenue water sales must not be blank and must be a number' }, done);
  });

  it('should require annual fees charged', done => {
    request
    .post('/rates-finances-fixedcosts')
    .set('token', token)
    .send({
      water_systems_id: 1,
      current_average_water_rate: 1,
      total_financial_reserves: 50000,
      annual_revenue_water_sales: 50000,
      annual_revenue_subsidies: 1000,
      annual_savings_to_financial_reserves: 1000,
      annual_personnel_costs: 40000,
      annual_operations_costs: 30000,
      annual_debt_costs: 4000,
    })
    .expect('Content-Type', /json/)
    .expect({ status: 400, ErrorMessage: 'Annual revenue fees charged must not be blank and must be a number' }, done);
  });

    it('should require annual fees charged to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 'String',
        annual_revenue_subsidies: 1000,
        annual_savings_to_financial_reserves: 1000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual revenue fees charged must not be blank and must be a number' }, done);
    });

    it('should require annual revenue subsidies', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_savings_to_financial_reserves: 1000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual revenue subsidies must not be blank and must be a number' }, done);
    });

    it('should require annual savings to financial reserves to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 40000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual savings to financial reserves must not be blank and must be a number' }, done);
    });

    it('should require annual savings to financial reserves to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 40000,
        annual_savings_to_financial_reserves: 'String',
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual savings to financial reserves must not be blank and must be a number' }, done);
    });

    it('should require annual revenue subsidies to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 'String',
        annual_savings_to_financial_reserves: 1000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual revenue subsidies must not be blank and must be a number' }, done);
    });

    it('should require annual savings to financial reserves', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual savings to financial reserves must not be blank and must be a number' }, done);
    });

    it('should require annual savings to financial reserves to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_savings_to_financial_reserves: 'Hello',
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual savings to financial reserves must not be blank and must be a number' }, done);
    });


    it('should require annual personnel costs', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_savings_to_financial_reserves: 2000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual personnel costs must not be blank and must be a number' }, done);
    });


    it('should require annual personnel costs to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_savings_to_financial_reserves: 3000,
        annual_personnel_costs: 'String',
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual personnel costs must not be blank and must be a number' }, done);
    });

    it('should require annual operations', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_savings_to_financial_reserves: 3000,
        annual_personnel_costs: 3000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual operations costs must not be blank and must be a number' }, done);
    });

    it('should require annual operations costs to be a number', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 1,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 100000,
        annual_savings_to_financial_reserves: 3000,
        annual_personnel_costs: 50000,
        annual_operations_costs: 'String',
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Annual operations costs must not be blank and must be a number' }, done);
    });

    it('Denies requests to reference water systems the user isnt connected to', done => {
      request
      .post('/rates-finances-fixedcosts')
      .set('token', token)
      .send({
        water_systems_id: 2,
        current_average_water_rate: 1,
        total_financial_reserves: 50000,
        annual_revenue_water_sales: 60000,
        annual_revenue_fees_charged: 5000,
        annual_revenue_subsidies: 10000,
        annual_savings_to_financial_reserves: 1000,
        annual_personnel_costs: 40000,
        annual_operations_costs: 30000,
        annual_debt_costs: 4000,
      })
      .expect('Content-Type', /json/)
      .expect({ status: 400, ErrorMessage: 'Water system not found!' }, done);
    });
});
