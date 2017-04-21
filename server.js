
'use strict';

// refactor to es6
const express = require('express');
const dotenv = require('dotenv');

// finish below
// import login from './routes/something/login';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// app.get('/', (req, res) => {
//   res.send('drunk with POWER');
// });

const users = require('./routes/users');

app.use(users);

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

