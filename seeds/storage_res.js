
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('storage_res').del()
    .then(() => {
      return knex('storage_res').insert([{
        id: 1,
        water_systems_id: 1,
        reservoir_type: 'a big wooden thing',
        reservoir_name: 'Big ass thing',
        year_constructed: 1998,
        capacity: 1000000,
        condition: 'poor',
        estimated_replacement_cost: 10000,
        estimated_time_to_replacement: 10,
        rate_increase_sentence: 'You should increase your rates man',
      }]);
    });
};
