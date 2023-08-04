/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", table => {
        table.string("image")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.table("sites", table => {
        table.dropColumn("image")
    })
}
