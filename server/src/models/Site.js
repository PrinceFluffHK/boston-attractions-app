const Model = require("./Model.js");

class Site extends Model {
    static get tableName() {
        return "sites";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "address", "description", "setting"],
            properties: {
                name: { type: "string" },
                address: { type: "string" },
                description: { type: "string" },
                setting: { type: "string" },
                minimumAge: { type: ["string", "integer"] },
                image: { type: "string" },
            },
        };
    }
}

module.exports = Site;