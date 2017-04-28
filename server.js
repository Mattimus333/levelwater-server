'use strict';

// refactor to es6
const express = require('express');
const dotenv = require('dotenv');
const users = require('./routes/users');
const sources = require('./routes/sources');
const waterSystems = require('./routes/water_systems');
const storageReservoirs = require('./routes/storageReservoirs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// finish below
// import login from './routes/something/login';
const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(users);
app.use(sources);
app.use(waterSystems);
app.use(storageReservoirs);

app.use((_req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 8000;

// const express = require('express');
app.listen(PORT, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', PORT);
  }
});

// below ?
// export default app;
module.exports = app;
