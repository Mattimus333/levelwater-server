exports.up = function (knex, Promise) {
  return knex.schema.createTable('sources', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.string('source_name', 'char(60)').notNullable().defaultTo('');
    table.enum('source_type', ['gw', 'sw']);
    table.enum('critical_to_operations', ['true', 'false']).defaultTo('false');
    table.enum('treatment', ['true', 'false']).defaultTo('false');
    table.integer('year_constructed');
    table.integer('capacity').notNullable().defaultTo(0);
    table.enum('condition', ['great', 'fair', 'poor']).defaultTo('great');
    table.integer('estimated_replacement_cost').notNullable().defaultTo(0);
    table.integer('estimated_time_to_replacement').notNullable().defaultTo(0);
    table.text('rate_increase_sentence').notNullable().defaultTo('');
    table.enum('continuous_clorination', ['true', 'false']).defaultTo('false');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('sources');
};
