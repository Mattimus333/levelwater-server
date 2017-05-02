const knex = require('../../knex');

const sources = [];
const treatment = [];
const storage = [];
const distribution = [];
const finances = [];

const postAlgorithm = (req, res) => {
  knex('sources')
  .where('water_systems_id', req.params.water_systems_id)
  .then((sourceResults) => {
    // console.log('this is sourceResults:', sourceResults);
    for (let i = 0; i < sourceResults.length; i++) {
      sources.push(sourceResults[i]);
    }
    console.log('this is sources:', sources);
  })
  .then((result) => {
    knex('treatment')
    .where('water_systems_id', req.params.water_systems_id)
    .then((treatmentResult) => {
      // console.log('this is treatmentResult:', treatmentResult);
      for (let i = 0; i < treatmentResult.length; i++) {
        treatment.push(treatmentResult[i]);
      }
      console.log('this is treatment:', treatment);
    });
  })
  .then((result) => {
    knex('storage_reservoirs')
    .where('water_systems_id', req.params.water_systems_id)
    .then((storageResult) => {
      for (let i = 0; i < storageResult.length; i++) {
        storage.push(storageResult[i]);
      }
      console.log('this is storage:', storage);
    });
  })
  .then((result) => {
    knex('distribution_system')
    .where('water_systems_id', req.params.water_systems_id)
    .then((distributionResult) => {
      for (let i = 0; i < distributionResult.length; i++) {
        distribution.push(distributionResult[i]);
      }
      console.log('this is distribution: ', distribution);
    });
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postAlgorithm;


// const myPromise = new Promise((resolve, error) => { resolve('param!'); });
// myPromise
//   .then((x) => {
//     console.log(x);
//     return knex.select('column')
//                .from('table')
//                .then(handleData);
//   })
//   .then(data_from_handleData => knex.select('another_column')
//                .from('another_table'));
