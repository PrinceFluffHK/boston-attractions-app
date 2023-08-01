const Model = require("./Model.js")

class Site extends Model {
    static get tableName() {
        return "sites"
    } 
}

module.exports = Site