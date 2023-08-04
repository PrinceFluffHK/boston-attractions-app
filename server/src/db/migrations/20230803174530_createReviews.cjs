/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("reviews", (table) => {
        table.bigIncrements("id")
        table.bigInteger("siteId")
            .unsigned()
            .notNullable()
            .index()
            .references("sites.id")
        table.bigInteger("userId")
            .unsigned()
            .notNullable()
            .index()
            .references("users.id")
        table.string("textBody").notNullable()
        table.integer("rating").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("reviews")
}