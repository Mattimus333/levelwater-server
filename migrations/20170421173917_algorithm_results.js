exports.up = function (knex, Promise) {
  return knex.schema.createTable('algorithm_results', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.integer('target_rate').notNullable().defaultTo(0);
    table.integer('rate_schedule').notNullable().defaultTo(0);
    table.text('rate_increase_summary').notNullable().defaultTo('');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('algorithm_results');
};
