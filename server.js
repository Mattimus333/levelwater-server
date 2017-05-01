

// refactor to es6
const express = require('express');
const dotenv = require('dotenv');
const users = require('./routes/users');
const sources = require('./routes/sources');
const waterSystems = require('./routes/water_systems');
const storageReservoirs = require('./routes/storageReservoirs');
const treatment = require('./routes/treatment');
const distributionSystem = require('./routes/distributionSystem');
const ratesFinances = require('./routes/ratesFinances');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// finish below
// import login from './routes/something/login';
const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(users);
app.use(sources);
app.use(waterSystems);
app.use(storageReservoirs);
app.use(treatment);
app.use(distributionSystem);
app.use(ratesFinances);

app.use((_req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', PORT);
  }
});

// below ?
// export default app;
module.exports = app;
