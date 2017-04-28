'use strict';

// refactor to es6
const express = require('express');
const dotenv = require('dotenv');
const users = require('./routes/users');
const sources = require('./routes/sources');
const waterSystems = require('./routes/water_systems');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// finish below
// import login from './routes/something/login';
const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use(users);
app.use(sources);
app.use(waterSystems);

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
