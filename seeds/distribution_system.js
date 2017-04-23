exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('distribution_system').del()
    .then(() => {
      return knex('distribution_system').insert([{
        id: 1,
        water_systems_id: 1,
        total_length: 123,
        number_of_valves: 3,
        number_of_meters: 4,
        number_of_pumping_plants: 7,
        combined_pumping_capacity: 444,
        pumps_condition: 2,
      }]);
    });
};
