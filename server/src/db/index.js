import knex from 'knex';

import dbConfig from './knexfile';


const { NODE_ENV = 'development' } = process.env;

// Connection instance to the database
const dbConnection = knex(dbConfig[NODE_ENV]);

//check the latest migration file on app start
dbConnection.migrate.latest(dbConfig['migrations']);


export default dbConnection;
