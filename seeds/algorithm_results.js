exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('algorithm_results').del()
    .then(() => knex('algorithm_results').insert([{
      id: 1,
      water_systems_id: 2,
      algorithm_results: JSON.stringify({ ratesFinancesObject:
   { id: 1,
     water_systems_id: 1,
     current_average_water_rate: 40,
     total_financial_reserves: 10000,
     annual_revenue_water_sales: 50000,
     annual_revenue_fees_charged: 50000,
     annual_revenue_subsidies: 1000,
     annual_savings_to_financial_reserves: 1000,
     annual_personnel_costs: 40000,
     annual_operations_costs: 30000,
     annual_debt_costs: 4000 },
  criticalInfrastructure:
   [ [ 'First Street Well', 500000, 32, 15625 ],
     [ 'Main Street Tank', 800000, 5, 160000 ],
     [ 'First Street Tank', 1050000, 11, 95455 ],
     [ 'Distribution System', 1980000, 40, 1238 ] ],
  noncriticalInfrastructure:
   [ [ 'Main Street Well', 435000, 5, 87000 ],
     [ 'First Street Treatment Plant', 220000, 9, 24444 ] ] }),
    }]));
};
