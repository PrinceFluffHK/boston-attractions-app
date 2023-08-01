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
        table.integer("environment").unsigned()
        table.integer("minimumAge")
        table.string("imageUrl").defaultTo("https://images.unsplash.com/photo-1565127803082-69dd82351360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80")
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
