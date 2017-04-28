exports.up = function (knex, Promise) {
  return knex.schema.createTable('distribution_system', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.integer('total_length').notNullable().defaultTo(0);
    table.integer('number_of_valves').notNullable().defaultTo(0);
    table.integer('number_of_meters').notNullable().defaultTo(0);
    table.integer('number_of_pumping_plants').notNullable().defaultTo(0);
    table.integer('combined_pumping_capacity').notNullable().defaultTo(0);
    table.enum('pumps_condition', ['great', 'fair', 'poor']).defaultTo('great');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('distribution_system');
};
