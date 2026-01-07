/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const hasTable = await knex.schema.hasTable('users');

    if (!hasTable) {
          return knex.schema.createTable('users', (table) => {
          table.increments('id').primary();
          table.string('username').unique().notNullable();
          table.string('password').notNullable();
          table.string('role', 50).defaultTo('user'); // Relasi ke tabel user
          table.timestamps(true, true);
      });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('users');
};
