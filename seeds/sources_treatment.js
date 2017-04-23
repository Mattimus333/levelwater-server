exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sources_treatment').del()
    .then(() => {
      return knex('sources_treatment').insert([{
        id: 1,
        sources_id: 1,
        treatment_id: 1,
      }]);
    });
};
