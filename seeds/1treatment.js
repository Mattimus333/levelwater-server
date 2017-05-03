exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('treatment').del().then(() => knex('treatment').insert([{
    id: 1,
    water_systems_id: 1,
    treatment_name: 'First Street Treatment Plant',
    treatment_type: 'conventional-sw',
    year_constructed: 1986,
    capacity: 200,
    condition: 'fair',
    critical_to_operations: 'false',
  },
  {
    id: 2,
    water_systems_id: 2,
    treatment_name: 'First Street Ion Exchange Plant',
    treatment_type: 'ion-exchange',
    year_constructed: 2000,
    capacity: 250,
    condition: 'great',
    critical_to_operations: 'true',
  },
  {
    id: 3,
    water_systems_id: 3,
    treatment_name: 'First Street Corrosion Control',
    treatment_type: 'corrosion-control',
    year_constructed: 2010,
    capacity: 350,
    condition: 'poor',
    critical_to_operations: 'true',
  }]));
};
