const express = require('express');

const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const morgan = require('morgan');
