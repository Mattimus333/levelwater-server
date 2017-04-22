exports.up = function (knex, Promise) {
  return knex.schema.createTable('rate_finances_fixedcosts', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().references('id').inTable('water_systems').onDelete('CASCADE');
    table.integer('current_water_rate').notNullable().defaultTo(0);
    table.integer('monthly_savings_amount').notNullable().defaultTo(0);
    table.integer('total_financial_reserves').notNullable().defaultTo(0);
    table.integer('monthly_debt_financing_costs').notNullable().defaultTo(0);
    table.integer('personnel_costs').notNullable().defaultTo(0);
    table.integer('monthly_chem_costs').notNullable().defaultTo(0);
    table.integer('monthly_elec_costs').notNullable().defaultTo(0);
    table.integer('other_monthly_fixed_costs').notNullable().defaultTo(0);
    table.integer('status_code').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('rate_finances_fixedcosts');
};
