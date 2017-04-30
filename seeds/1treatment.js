exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('treatment').del().then(() => {
    return knex('treatment').insert([{
      id: 1,
      treatment_id: 1,
      treatment_type: 'adsorptive',
      year_constructed: 1066,
      capacity: 2000,
      condition: 22,
    }]);
  });
};
