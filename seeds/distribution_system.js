exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('distribution_system').del()
    .then(() => {
      return knex('distribution_system').insert([{
        id: 1,
        water_systems_id: 1,
        total_length_miles: 15,
        average_age_of_pipes: 50,
        average_main_diameter_inches: '4',
      }]);
    });
};
