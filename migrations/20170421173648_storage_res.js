exports.up = function (knex, Promise) {
  return knex.schema.createTable('storage_reservoirs', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.enum('reservoir_type', ['concrete', 'steel', 'redwood', 'plastic']).defaultTo('steel');
    table.string('reservoir_name', 'char(120)').notNullable().defaultTo('');
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.enum('condition', ['great', 'fair', 'poor']).defaultTo('great');
    table.enum('critical_to_operations', ['true', 'false']).defaultTo('false');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('storage_reservoirs');
};
