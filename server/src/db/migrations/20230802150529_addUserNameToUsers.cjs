/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", (table) =>{
        table.string("username").notNullable()
        table.string("firstName").notNullable()
        table.string("lastName").notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", (table)=>{
        table.dropColumn("username")
        table.dropColumn("firstName")
        table.dropColumn("lastName")
    })
    
}
