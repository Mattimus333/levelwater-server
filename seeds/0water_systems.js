
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('water_systems').del()
    .then(() => {
      return knex('water_systems').insert([{
        id: 1,
        pws_name: 'Drunk with power',
        pws_id: 333,
        population: 100,
        connections: 444,
        max_day_demand: 444,
      }]);
    });
};
