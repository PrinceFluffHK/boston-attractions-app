/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("sites", table => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("address").notNullable()
        table.text("description").notNullable()
        table.string("environment")
        table.integer("minimumAge")
        table.string("imageUrl")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    }) 
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("sites")
}
