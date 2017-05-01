exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('water_systems').del()
    .then(() => {
      return knex('water_systems').insert([{
        id: 1,
        pws_name: 'Drunk with power',
        pws_id: 1234567,
        population: 1000,
        connections: 444,
      }]);
    });
};
