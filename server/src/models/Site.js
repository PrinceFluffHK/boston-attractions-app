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
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "sites.id",
                    through: {
                        from: "reviews.siteId",
                        to: "reviews.userId",
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Site;