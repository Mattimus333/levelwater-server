exports.up = function (knex, Promise) {
  return knex.schema.createTable('rates_finances_fixedcosts', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.decimal('current_average_water_rate', 6, 2).notNullable().defaultTo(0);
    table.integer('total_financial_reserves').notNullable().defaultTo(0);
    table.integer('annual_revenue_water_sales').notNullable().defaultTo(0);
    table.integer('annual_revenue_fees_charged').notNullable().defaultTo(0);
    table.integer('annual_revenue_subsidies').notNullable().defaultTo(0);
    table.integer('annual_savings_to_financial_reserves').notNullable().defaultTo(0);
    table.integer('annual_personnel_costs').notNullable().defaultTo(0);
    table.integer('annual_operations_costs').notNullable().defaultTo(0);
    table.integer('annual_debt_costs').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('rates_finances_fixedcosts');
};
