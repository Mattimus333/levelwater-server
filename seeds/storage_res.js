exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('storage_reservoirs').del()
    .then(() => {
      return knex('storage_reservoirs').insert([{
        id: 1,
        water_systems_id: 1,
        reservoir_type: 'a big wooden thing',
        reservoir_name: 'Big ass thing',
        year_constructed: 1998,
        capacity: 1000000,
        condition: 'poor',
        critical_to_operations: 'true',
      }]);
    });
};
