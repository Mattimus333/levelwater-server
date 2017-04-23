
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rates_finances_fixedcosts').del()
    .then(() => {
      return knex('rates_finances_fixedcosts').insert([{
        id: 1,
        water_systems_id: 1,
        current_average_water_rate: 100.33,
        total_financial_reserves: 10000,
        annual_revenue_water_sales: 50000,
        annual_revenue_fees_charged: 2999,
        annual_revenue_subsidies: 1000,
        annual_savings_to_financial_reserves: 100000,
        annual_personnel_costs: 400000,
        annual_operations_costs: 3333,
        annual_debt_costs: 4000,
      }]);
    });
};
