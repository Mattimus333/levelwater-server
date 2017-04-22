exports.up = function (knex, Promise) {
  return knex.schema.createTable('sources_treatment', (table) => {
    table.increments();
    table.integer('sources_id').notNullable().references('id').inTable('sources').onDelete('CASCADE');
    table.integer('treatment_id').notNullable().references('id').inTable('treatment').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('sources_treatment');
};
