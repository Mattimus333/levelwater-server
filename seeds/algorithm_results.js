exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('algorithm_results').del()
    .then(() => {
      return knex('algorithm_results').insert([{
        id: 1,
        water_systems_id: 1,
        
      }]);
    });
};
