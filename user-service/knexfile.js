require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'user-db',           // Sama-sama mengarah ke user-db
      user: process.env.USER_DB_USER,
      password: process.env.USER_DB_PASSWORD,
      database: process.env.USER_DB_NAME,
      port: 5432,
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations_user' // Unik untuk User
    }
  }
};