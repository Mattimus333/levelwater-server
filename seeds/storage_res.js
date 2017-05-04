exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('storage_reservoirs').del()
    .then(() => knex('storage_reservoirs').insert([{
      id: 1,
      water_systems_id: 1,
      reservoir_type: 'steel',
      reservoir_name: 'Main Street Tank',
      year_constructed: 1975,
      capacity: 250000,
      condition: 'poor',
      critical_to_operations: 'true',
    },
    {
      id: 2,
      water_systems_id: 1,
      reservoir_type: 'concrete',
      reservoir_name: 'First Street Tank',
      year_constructed: 2000,
      capacity: 500000,
      condition: 'fair',
      critical_to_operations: 'true',
    },
    {
      id: 3,
      water_systems_id: 2,
      reservoir_type: 'redwood',
      reservoir_name: 'Main Street Tank',
      year_constructed: 1980,
      capacity: 50000,
      condition: 'poor',
      critical_to_operations: 'true',
    },
    {
      id: 4,
      water_systems_id: 3,
      reservoir_type: 'plastic',
      reservoir_name: 'Main Street Tank',
      year_constructed: 2000,
      capacity: 200000,
      condition: 'great',
      critical_to_operations: 'true',
    }]));
};
