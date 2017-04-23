exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        water_systems_id: 1,
        first_name: 'Joanne',
        last_name: 'Rowling',
        email: 'jkrowling@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        superuser: 'false',
      }]);
    });
};
