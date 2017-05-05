# levelwater-server

## What
An express server for level-water.herokuapp.com.  The deployed server itself is running at levelwater-server.herokuapp.com.
See our JS Doc HTML page here for route documentation.  

## Setup
To run this on your own machine locally first fork and clone this repo.  
`npm install`
Installs dependencies
`knex migrate:latest && knex seed:run`
set up tables and create seed data.  You must have mysql turned on with a levelwater db for this to work!
`npm start`
Runs the server on local host 8000.  


use this to lint all pages: './node_modules/.bin/eslint *'
use this to test all routes;  'npm test'
