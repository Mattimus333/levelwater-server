exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('algorithm_results').del()
    .then(() => knex('algorithm_results').insert([{
      id: 1,
      water_systems_id: 1,
      algorithm_results_object: 69,
    }]));
};
