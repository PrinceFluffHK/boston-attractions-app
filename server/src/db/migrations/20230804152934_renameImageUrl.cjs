/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", table => {
        table.dropColumn("imageUrl")
        table.string("image").defaultTo("https://express-file-uploading-part-2-production.s3.amazonaws.com/boston.jpeg")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.table("sites", table => {
        table.dropColumn("image")
        table.string("imageUrl")
    })
}
