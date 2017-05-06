# levelwater-server

An express server for [level-water.herokuapp.com](https://level-water.herokuapp.com).  The deployed server itself is running at [levelwater-server.herokuapp.com](https://levelwater-server.herokuapp.com).  
See our JS Doc HTML page here for route documentation.  

## Setup
- To run this on your own machine locally first fork and clone this repo.  
- In order to run it yourself you will need to create your own google app and create your own .env file.  
- The .env file needs three properties, JWT_KEY, CLIENTID, and CLIENTSECRET.  
- JWT KEY will have to be generated, while CLIENTID and CLIENTSECRET will be provided by Google when you create a google app. See our env sample file (just fill in the values and add a . at the beginning!)

`npm install`
Installs dependencies

`knex migrate:latest && knex seed:run`
Set up tables and create seed data.  You must have mysql turned on with a database called levelwater for this to work!

`npm start`
Runs the server on local host 8000.  

Use this to lint all pages: `./node_modules/.bin/eslint *`
Use this to test all routes: `npm test`

## Functionality
levelwater-server is a node server that uses the express module to send get, post, patch, and delete requests to a database.  Users can authenticate through traditional signup/login or Google oauth.  To access most routes, the user must be authorized to make requests to the desired water system.
- To view route documentation run `out/index.html` locally.   

## About Level water

At levelwater.io, we believe that America’s drinking water deserves an ‘A’ grade. We strive to help public water systems plan for future capital investment needs by providing a user-friendly, low-overhead asset management tool.

levelwater.io allows public water systems to develop an inventory and estimate of critical assets, including remaining useful life and replacement costs. By analyzing information pertinent to public water systems, users are able to anticipate major capital investments and set water rates that capture the full cost of providing water.
