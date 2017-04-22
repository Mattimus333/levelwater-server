exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('PWS_name').notNullable().defaultTo('');
  });
};

exports.down = function (knex, Promise) {

};
