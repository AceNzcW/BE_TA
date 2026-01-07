require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'user-db',           // Nama service di docker-compose
      user: process.env.USER_DB_USER,
      password: process.env.USER_DB_PASSWORD,
      database: process.env.USER_DB_NAME,
      port: 5432,                // Port internal container
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations_auth' // Unik untuk Auth
    }
  }
};