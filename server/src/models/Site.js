const Model = require("./Model.js")

class Site extends Model {
  static get tableName() {
    return "sites"
  }

  static get jsonSchema() {
    return{
      type: "object",
      required: ["name", "address", "description"],
      properties: {
        name: { type: "string", minLength: 1 },
        address: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 1},
        setting: { type: "string" },
        minimumAge: { type: ["string", "integer"] },
        imageUrl: { type: "string" }
      }
    }
  }
}

module.exports = Site