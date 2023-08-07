/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("sites", table => {
        table.bigInteger("creatorId").notNullable().index().unsigned().references("users.id")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("sites", table => {
        table.dropColumn("creatorId")
    })
}
