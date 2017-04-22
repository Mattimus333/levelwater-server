exports.up = function (knex, Promise) {
  return knex.schema.createTable('algorithm_results', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().references('id').inTable('water_systems').onDelete('CASCADE');
    table.integer('target_rate').notNullable().defaultTo(0);
    table.integer('rate_schedule').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('algorithm_results');
};
