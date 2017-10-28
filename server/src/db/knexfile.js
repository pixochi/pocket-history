module.exports = {
  development: {
    client: 'pg',
    connection: {
    	user: process.env.SQL_USER,
		  password: process.env.SQL_PASSWORD,
		  database: process.env.SQL_DATABASE,
    }
  },
  production: {
  	client: 'pg',
  	connection: {
    	user: process.env.SQL_USER,
		  password: process.env.SQL_PASSWORD,
		  database: process.env.SQL_DATABASE,
		  host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    }
  },
  migrations: {
    directory: __dirname+"/migrations",
    tableName: "migrations"
  }
}