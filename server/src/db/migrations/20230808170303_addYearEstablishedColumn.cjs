/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", (table) => {
        table.integer("yearEstablished").defaultTo(0)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("sites", (table) => {
        table.dropColumn("yearEstablished")
    })
}
