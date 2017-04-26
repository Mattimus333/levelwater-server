const knex = require('../../knex');

const deleteWaterSystem = (req, res) => {
  console.log('claim', req.claim);
  console.log('params', req.params.id);
  // if (req.claim.id !== req.params.id) {
  //   return res.status(404).send('This user could not be found');
  // }
  let waterSystemsId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    console.log('result', result[0]);
    if (req.params.id === result.water_systems_id) {
      return knex('water_systems')
      .where('id', req.params.id)
      .del();
    } else {
      throw new Error('Water System not found');
    }
  })
  .then((result) => {
    console.log('res', result);
    res.status(200).json(result);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = deleteWaterSystem;
