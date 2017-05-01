exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('storage_reservoirs').del()
    .then(() => {
      return knex('storage_reservoirs').insert([{
        id: 1,
        water_systems_id: 1,
        reservoir_type: 'steel',
        reservoir_name: 'Main Street Tank',
        year_constructed: 1975,
        capacity: 250000,
        condition: 'poor',
        critical_to_operations: 'true',
      }]);
    });
};
