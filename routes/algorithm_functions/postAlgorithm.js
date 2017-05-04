const knex = require('../../knex');
const startAlgorithm = require('../../water-math/app.js');


const sourceObjectArray = [];
const treatmentObjectArray = [];
const storageObjectArray = [];
const distributionObjectArray = [];
const ratesFinancesObjectArray = [];
const algorithmResultsObject = {};

const getInfoFromTables = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found'})
    }
    return Promise.all([
      knex('sources')
          .where('water_systems_id', req.params.water_systems_id)
          .then((sourceResults) => {
            // console.log('this is sourceResults:', sourceResults);
            for (let i = 0; i < sourceResults.length; i++) {
              sourceObjectArray.push(sourceResults[i]);
            }
          }),
      knex('treatment')
          .where('water_systems_id', req.params.water_systems_id)
          .then((treatmentResult) => {
            // console.log('this is treatmentResult:', treatmentResult);
            for (let i = 0; i < treatmentResult.length; i++) {
              treatmentObjectArray.push(treatmentResult[i]);
            }
            // console.log('this is treatment:', treatmentObjectArray);
          }),
      knex('storage_reservoirs')
          .where('water_systems_id', req.params.water_systems_id)
          .then((storageResult) => {
            for (let i = 0; i < storageResult.length; i++) {
              storageObjectArray.push(storageResult[i]);
            }
            // console.log('this is storage:', storageObjectArray);
          }),
      knex('distribution_system')
          .where('water_systems_id', req.params.water_systems_id)
          .then((distributionResult) => {
            for (let i = 0; i < distributionResult.length; i++) {
              distributionObjectArray.push(distributionResult[i]);
            }
          }),
      knex('rates_finances_fixedcosts')
          .where('water_systems_id', req.params.water_systems_id)
          .then((ratesFinancesResult) => {
            for (let i = 0; i < ratesFinancesResult.length; i++) {
              ratesFinancesObjectArray.push(ratesFinancesResult[i]);
            }
          }),
      ]);
    })
  .then(() => {
    return (startAlgorithm(sourceObjectArray, treatmentObjectArray, storageObjectArray, distributionObjectArray, ratesFinancesObjectArray));
  })
  .then((result) => {
    algorithmResultsObject.water_systems_id = req.params.water_systems_id;
    algorithmResultsObject.algorithm_results = JSON.stringify(result);
    return knex('algorithm_results')
    .insert((algorithmResultsObject));
  })
  .then(() => {
    res.status(200).json(algorithmResultsObject);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = getInfoFromTables;
