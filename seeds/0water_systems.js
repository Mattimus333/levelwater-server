exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('water_systems').del()
    .then(() => knex('water_systems').insert([{
      id: 1,
      pws_name: 'Drunk with power',
      pws_id: 1234567,
      population: 1000,
      connections: 444,
    },
    {
      id: 2,
      pws_name: 'East Bay MUD',
      pws_id: 7654321,
      population: 1000000,
      connections: 444444,
    },
    {
      id: 3,
      pws_name: 'SFPUC',
      pws_id: 1111112,
      population: 800000,
      connections: 555555,
    }]));
};
