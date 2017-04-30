const knex = require('../../knex');

const postRatesFinances = (req, res) => {
  const {
    water_systems_id,
    current_average_water_rate,
    total_financial_reserves,
    annual_revenue_water_sales,
    annual_revenue_fees_charged,
    annual_revenue_subsidies,
    annual_savings_to_financial_reserves,
    annual_personnel_costs,
    annual_operations_costs,
    annual_debt_costs
  } = req.body;

  const ratesFinances = {
    water_systems_id,
    current_average_water_rate,
    total_financial_reserves,
    annual_revenue_water_sales,
    annual_revenue_fees_charged,
    annual_revenue_subsidies,
    annual_savings_to_financial_reserves,
    annual_personnel_costs,
    annual_operations_costs,
    annual_debt_costs
  };

  if (typeof water_systems_id !== 'number') {
    return res.status(400).send('water systems id must not be blank');
  }
  if (typeof current_average_water_rate !== 'number') {
    return res.status(400).send('2');
  }
  if (typeof total_financial_reserves !== 'number') {
    return res.status(400).send('3');
  }
  if (typeof annual_revenue_water_sales !== 'number') {
    return res.status(400).send('4');
  }
  if (typeof annual_revenue_fees_charged !== 'number') {
    return res.status(400).send('5');
  }
  if (typeof annual_revenue_subsidies !== 'number') {
    return res.status(400).send('6');
  }
  if (typeof annual_savings_to_financial_reserves !== 'number') {
    return res.status(400).send('7');
  }
  if (typeof annual_personnel_costs !== 'number') {
    return res.status(400).send('8');
  }
  if (typeof annual_operations_costs !== 'number') {
    return res.status(400).send('9');
  }
  if (typeof annual_debt_costs !== 'number') {
    return res.status(400).send('10');
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    console.log('here');
    if (Number(ratesFinances.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .insert(ratesFinances)
  })
  .then((result) => {
    console.log('made');
    ratesFinances.id = result[0];
    res.status(200).json(ratesFinances);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = postRatesFinances;
