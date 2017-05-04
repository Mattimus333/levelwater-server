exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('distribution_system').del()
    .then(() => knex('distribution_system').insert([{
      id: 1,
      water_systems_id: 1,
      total_length_miles: 15,
      average_age_of_pipes: 50,
      average_main_diameter_inches: '4',
      condition: 'great',
    },
    {
      id: 2,
      water_systems_id: 2,
      total_length_miles: 400,
      average_age_of_pipes: 65,
      average_main_diameter_inches: '12',
      condition: 'fair',
    },
    {
      id: 3,
      water_systems_id: 3,
      total_length_miles: 750,
      average_age_of_pipes: 50,
      average_main_diameter_inches: '12',
      condition: 'poor',
    }]));
};
