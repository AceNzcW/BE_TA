// knexfile.js
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2', // 'mysql2' untuk dokter, 'pg' untuk booking
    connection: {
      host: process.env.DB_HOST || 'doctor-db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'clinic',
      port: Number(process.env.DB_PORT) || 3306
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};