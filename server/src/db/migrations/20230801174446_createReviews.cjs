/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("reviews", table => {
        table.bigIncrements("id")
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("siteId").notNullable().unsigned().index().references("sites.id")
        table.integer("rating").unsigned().notNullable()
        table.text("reviewBody")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("reviews")
}
