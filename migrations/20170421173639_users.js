exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.integer('water_systems_id').unsigned().references('id').inTable('water_systems').onDelete('SET NULL');
    table.string('first_name', 'char(60)').notNullable().defaultTo('');
    table.string('last_name', 'char(60)').notNullable().defaultTo('');
    table.string('email', 'char(60)').notNullable().unique();
    table.string('hashed_password', 'char(60)').notNullable();
    table.enum('superuser', ['true', 'false']).defaultTo('false');
    table.enum('profileStepCompleted', ['none', 'basic', 'revenue', 'source', 'treatment', 'storage', 'distribution', 'algorithm']).defaultTo('none');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
