/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", table => {
        table.renameColumn("imageUrl", "image")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.table("sites", table => {
        table.renameColumn("image", "imageUrl")
    })
}
