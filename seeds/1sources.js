exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sources').del()
    .then(() => {
      return knex('sources').insert([{
        id: 1,
        water_systems_id: 1,
        source_name: 'First Street Well',
        source_type: 'gw',
        critical_to_operations: 'true',
        treatment: 'true',
        year_constructed: 1999,
        capacity: 100,
        condition: 'great',
        continuous_chlorination: 'false',
      }]);
    });
};
