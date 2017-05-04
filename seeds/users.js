exports.seed = function (knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([{
      id: 1,
      water_systems_id: 1,
      first_name: 'Axel',
      last_name: 'K',
      email: 'alex83@gmail.com',
      hashed_password: '$2a$12$gu7YpvRMhFigRfd926FSL.88tRajaCtd7m00M.lO5fGR1IhbApXm.',
      superuser: 'true',
    },
    {
      id: 2,
      water_systems_id: 2,
      first_name: 'Bob',
      last_name: 'K',
      email: 'bob@gmail.com',
      hashed_password: '$2a$12$3AvRLQk7D.7GNXjuX/8rqefxt9TLo42NeW77ln3.mnnXYACTfc12e',
      superuser: 'true',
    },
    {
      id: 3,
      water_systems_id: 3,
      first_name: 'Fred',
      last_name: 'K',
      email: 'fred@gmail.com',
      hashed_password: '$2a$12$RRlmART1CQol71mHKTBXz.QIbKL0/SRFJB7Xh5xiZqJKLftncXyxe',
      superuser: 'true',
    }]));
};
