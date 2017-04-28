exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        water_systems_id: 1,
        first_name: 'Axel',
        last_name: 'K',
        email: 'alex83@gmail.com',
        hashed_password: '$2a$12$gu7YpvRMhFigRfd926FSL.88tRajaCtd7m00M.lO5fGR1IhbApXm.',
        superuser: 'true',
      }]);
    });
};
