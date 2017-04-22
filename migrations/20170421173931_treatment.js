exports.up = function (knex, Promise) {
  return knex.schema.createTable('treatment', (table) => {
    table.increments();
    table.integer('treatment_id').notNullable().defaultTo(0);
    table.string('treatment_type', 'char(60)').notNullable().defaultTo('');
    table.integer('treatment_media').notNullable().defaultTo(0);
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.integer('condition').notNullable().defaultTo(0);
    table.integer('status_code').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('treatment');
};
