exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rates_finances_fixedcosts').del()
    .then(() => {
      return knex('rates_finances_fixedcosts').insert([{
        id: 1,
        water_systems_id: 1,
        current_water_rate: 5,
        monthly_savings_amount: 77,
        total_financial_reserves: 88,
        monthly_debt_financing_costs: 1,
        personnel_costs: 5,
        monthly_chem_costs: 3333,
        monthly_elec_costs: 3,
        other_monthly_fixed_costs: 6,
        status_code: 404,
      }]);
    });
};
