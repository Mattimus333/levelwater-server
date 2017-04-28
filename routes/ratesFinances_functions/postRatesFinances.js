const knex = require('../../knex');

const postRatesFinances = (req, res) => {
  const {
    water_systems_id,
    current_average_water_rate,
    total_financial_reserves,
    annual_revenue_water_sales,
    annual_revenue_fees_charges,
    annual_revenue_subsidies,
    annual_savings_to_financial_reserve,
    annual_personnel_costs,
    annual_operational_costs,
    annual_debt_costs
  } = req.body;

}
