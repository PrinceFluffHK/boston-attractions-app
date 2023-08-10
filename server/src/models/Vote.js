const Model = require("./Model")

class Vote extends Model {
    static get tableName() {
        return "votes"
    }

    static get relationMappings() {
        const { User, Review } = require("./index.js")
        return {
            voter: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "votes.voterId",
                    to: "users.id"
                }
            },
            review: {
                relation: Model.BelongsToOneRelation,
                modelClass: Review,
                join: {
                    from: "votes.reviewId",
                    to: "reviews.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["voteValue", "voterId", "reviewId"],
            properties: {
                voteValue: { type: ["integer", "string"] },
                voterId: { type: ["integer", "string"] },
                reviewId: { type: ["integer", "string"] },
            }
        }
    }
}

module.exports = Vote