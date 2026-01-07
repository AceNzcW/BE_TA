/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema
    .createTable('queue_counter', (table) => {
      table.integer('doctor_id').notNullable();
      table.date('booking_date').notNullable();
      table.integer('last_number').defaultTo(0);
      table.primary(['doctor_id', 'booking_date']);
    })
    .createTable('bookings', (table) => {
      table.increments('id').primary();
      table.string('patient_name').notNullable();
      table.string('patient_contact').nullable();

      table.integer('doctor_id').notNullable();

      table.date('appointment_date').notNullable();
      table.integer('queue_number').notNullable();
      table.string('status').defaultTo('pending');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings').dropTable('queue_counter');
};
