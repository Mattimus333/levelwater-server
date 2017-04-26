'use strict';

// refactor to es6
const express = require('express');
const dotenv = require('dotenv');
const users = require('./routes/users');
const waterSystems = require('./routes/water_systems');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// finish below
// import login from './routes/something/login';
const app = express();


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const path = require('path');

app.use(express.static(path.join('public')));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(users);
app.use(waterSystems);

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
