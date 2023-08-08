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
                yearEstablished: { type: ["string", "integer"], maxLength: 4},
                image: { type: "string" },
                creatorId: { type: ["string", "integer"] },
            },
        };
    }

    static get relationMappings() {
        const { Review, User } = require("./index.js")
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "sites.id",
                    to: "reviews.siteId"
                }
            },
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "sites.creatorId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Site;