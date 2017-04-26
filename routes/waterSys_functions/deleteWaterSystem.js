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
    console.log(req.params.id);
    console.log(result[0].water_systems_id);
    if (Number(req.params.id) === Number(result[0].water_systems_id)) {
      console.log('before delete');
      return knex('water_systems')
      .del()
      .where('id', (req.params.id));
    } else {
      throw new Error('Water System not found');
    }
  })
  .then((data) => {
    console.log('data', data);
    res.status(200).json(data);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = deleteWaterSystem;
