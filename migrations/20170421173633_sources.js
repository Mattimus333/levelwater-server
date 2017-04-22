exports.up = function (knex, Promise) {
  return knex.schema.createTable('sources', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().references('id').inTable('water_systems').onDelete('CASCADE');
    table.string('source_name').notNullable().defaultTo('');
    table.integer('system_source_id').notNullable().defaultTo(0);
    table.string('source_type').notNullable().defaultTo('');
    table.boolean('treatment').notNullable().defaultTo(false);
    table.integer('capacity').notNullable().defaultTo(0);
    table.integer('condition').notNullable().defaultTo(0);
    table.integer('estimated_replacement_cost').notNullable().defaultTo(0);
    table.integer('estimated_time_to_replacement').notNullable().defaultTo(0);
    table.integer('status_code').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('sources');
};
