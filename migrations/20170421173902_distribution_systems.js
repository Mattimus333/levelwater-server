exports.up = function (knex, Promise) {
  return knex.schema.createTable('distribution_system', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().unsigned().references('id').inTable('water_systems').onDelete('CASCADE');
    table.integer('total_length_miles').notNullable().defaultTo(0);
    table.integer('average_age_of_pipes').notNullable().defaultTo(0);
    table.enum('condition', ['great', 'fair', 'poor']).defaultTo('great');
    table.string('distribution_name', 'char(120)').notNullable().defaultTo('Distribution System');
    table.enum('average_main_diameter_inches', ['4', '6', '8', '12', '24']).defaultTo('6');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('distribution_system');
};
