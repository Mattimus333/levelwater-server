exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('treatment').del().then(() => {
    return knex('treatment').insert([{
      id: 1,
      water_systems_id: 1,
      treatment_type: 'conventional-sw',
      year_constructed: 1986,
      capacity: 2000,
      condition: 'fair',
      critical_to_operations: 'true',
    }]);
  });
};
