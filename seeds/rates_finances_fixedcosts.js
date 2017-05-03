exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('rates_finances_fixedcosts').del()
    .then(() => knex('rates_finances_fixedcosts').insert([{
      id: 1,
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
    },
    {
      id: 2,
      water_systems_id: 2,
      current_average_water_rate: 30.00,
      total_financial_reserves: 10000,
      annual_revenue_water_sales: 250000,
      annual_revenue_fees_charged: 100000,
      annual_revenue_subsidies: 50000,
      annual_savings_to_financial_reserves: 25000,
      annual_personnel_costs: 150000,
      annual_operations_costs: 100000,
      annual_debt_costs: 45000,
    },
    {
      id: 3,
      water_systems_id: 3,
      current_average_water_rate: 35.00,
      total_financial_reserves: 100000,
      annual_revenue_water_sales: 350000,
      annual_revenue_fees_charged: 100000,
      annual_revenue_subsidies: 25000,
      annual_savings_to_financial_reserves: 25000,
      annual_personnel_costs: 250000,
      annual_operations_costs: 300000,
      annual_debt_costs: 50000,
    }]));
};
