# levelwater-server

## What
An express server for [level-water.herokuapp.com](https://level-water.herokuapp.com).  The deployed server itself is running at [levelwater-server.herokuapp.com](https://levelwater-server.herokuapp.com)
See our JS Doc HTML page here for route documentation.  

## Setup
To run this on your own machine locally first fork and clone this repo.  In order to run it yourself you will need to create your own google app and create your own .env file.  The .env file needs three properties, JWT_KEY, CLIENTID, and CLIENTSECRET.  JWT KEY will have to be generated and the other two you can get when you create a google app.  See our env sample file(just fill in the values and add a . at the beginning!)

`npm install`
Installs dependencies

`knex migrate:latest && knex seed:run`
set up tables and create seed data.  You must have mysql turned on with a database called levelwater for this to work!

`npm start`
Runs the server on local host 8000.  


## Functionality
levelwater-server is a node server that uses the express module to make get, post, patch and delete requests to a database.  Users can authenticate through traditional signup/login and google oauth.  To access most routes the user must be authorized to make requests to the water system in question.   

use this to lint all pages: `./node_modules/.bin/eslint *`
use this to test all routes;  `npm test`
