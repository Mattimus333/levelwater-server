exports.up = function (knex, Promise) {
  return knex.schema.createTable('storage_reservoirs', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.string('reservoir_type', 'char(60)').notNullable().defaultTo('');
    table.string('reservoir_name', 'char(120)').notNullable().defaultTo('');
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.enum('condition', ['great', 'fair', 'poor']).defaultTo('great');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('storage_reservoirs');
};
