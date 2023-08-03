/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", table => {
        table.renameColumn("environment", "setting")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.table("sites", table => {
        table.renameColumn("setting", "environment")
    })
}
