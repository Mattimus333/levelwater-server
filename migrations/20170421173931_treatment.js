exports.up = function (knex, Promise) {
  return knex.schema.createTable('treatment', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().defaultTo(0);
    table.enum('treatment_type', ['conventional-sw', 'ion-exchange', 'corrosion-control'])
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.enum('pumps_condition', ['great', 'fair', 'poor']).defaultTo('great');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('treatment');
};
