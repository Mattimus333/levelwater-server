exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.integer('water_systems_id').notNullable().references('id').inTable('water_systems').onDelete('CASCADE');
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable().unique();
    table.string('hashed_passwored', 'char(60)').notNullable();
    table.boolean().notNullable().defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
