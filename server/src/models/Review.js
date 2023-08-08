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
<<<<<<< HEAD
                rating: { type: ["string", "integer"], minLength: 1, maxLength: 5 },
=======
                rating: { type: ["string", "integer"] },
>>>>>>> 75786166859cbb97332c005da55c8db32ffee762
                siteId: { type: ["string", "integer"] },
                userId: { type: ["string", "integer"] }
            }
        }
    }

    static get relationMappings() {
        const { Site, User } = require("./index.js")
        return {
            site: {
                relation: Model.BelongsToOneRelation,
                modelClass: Site,
                join: {
                    from: "reviews.siteId",
                    to: "sites.id"
                }
            },
            user: {
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