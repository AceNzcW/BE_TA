require('dotenv').config();

module.exports = {
  development: {
    client: 'pg', // 'mysql2' untuk dokter, 'pg' untuk booking
    connection: {
      host: process.env.PGHOST || 'booking-db-1',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'jawahama123',
      database: process.env.PGNAME || 'clinic_booking',
      port: Number(process.env.PGPORT) || 5432
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.PGPORT) || 5432
    },
    pool: {
      min:2,
      max:10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};