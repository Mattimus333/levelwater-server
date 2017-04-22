exports.up = function (knex, Promise) {
  return knex.schema.createTable('storage_res', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().references('id').inTable('water_systems').onDelete('CASCADE');
    table.string('reservoir_type').notNullable().defaultTo('');
    table.integer('reservoir_name').notNullable().defaultTo(0);
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.integer('condition').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('storage_res');
};
