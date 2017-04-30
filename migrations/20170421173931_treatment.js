exports.up = function (knex, Promise) {
  return knex.schema.createTable('treatment', (table) => {
    table.increments();
    table.integer('treatment_id').notNullable().defaultTo(0);
    table.enum('treatment_type', ['surface_water_treatment', 'membrane_filtration', 'slow_sand_filtration', 'surface_water_package_plant', 'ion_exchange', 'adsorptive', 'coagulation_filtration'])
    table.integer('year_constructed').notNullable().defaultTo(0);
    table.integer('capacity').notNullable().defaultTo(0);
    table.integer('condition').notNullable().defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('treatment');
};
