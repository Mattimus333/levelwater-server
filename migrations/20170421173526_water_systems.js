exports.up = function (knex, Promise) {
  return knex.schema.createTable('water_systems', (table) => {
    table.increments();
    table.string('pws_name', 'char(120)').notNullable().defaultTo('');
    table.integer('pws_id').notNullable().defaultTo(0);
    table.integer('population').notNullable().defaultTo(0);
    table.integer('connections').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('water_systems');
};
