const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["textBody", "rating", "siteId", "userId"],
            properties: {
                textBody: { type: "string" },
                rating: { type: ["string", "integer"] },
                siteId: { type: ["string", "integer"] },
                userId: { type: ["string", "integer"] }
            }
        }
    }

    static get relationMappings() {
        const { Site, User } = require("./index.js")
        return {
            sites: {
                relation: Model.BelongsToOneRelation,
                modelClass: Site,
                join: {
                    from: "reviews.siteId",
                    to: "sites.id"
                }
            },
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Review