const knex = require('../../knex');
const startAlgorithm = require('../../water-math/app.js');


const sourceObjectArray = [];
const treatmentObjectArray = [];
const storageObjectArray = [];
const distributionObjectArray = [];
const ratesFinancesObjectArray = [];
let algorithmResultsObject;

const getInfoFromTables = (req, res) => {
  knex('users')

  Promise.all([
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
        // console.log('this is ratesFinances: ', ratesFinancesObjectArray);
      }),
])
  .then(() => {
    // console.log(startAlgorithm);
    // console.log('1', sourceObjectArray, '2', treatmentObjectArray, '3', storageObjectArray, '4', distributionObjectArray, '5', ratesFinancesObjectArray);
    return (startAlgorithm(sourceObjectArray, treatmentObjectArray, storageObjectArray, distributionObjectArray, ratesFinancesObjectArray));
  })
  .then((result) => {
    console.log(result, 'aw hell yeah');
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: 'Something went wrong accessing the database to create arrays' });
  });
}

module.exports = getInfoFromTables;
