const Model = require("./Model.js");

class Review extends Model {
    static get tableName() {
        return "reviews";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["textBody", "rating", "siteId", "userId"],
            properties: {
                textBody: { type: "string" },
                rating: { type: ["string", "integer"], minimum: 1, maximum: 5 },
                siteId: { type: ["string", "integer"] },
                userId: { type: ["string", "integer"] },
            },
        };
    }

    static get relationMappings() {
        const { Site, User, Vote } = require("./index.js");
        return {
            site: {
                relation: Model.BelongsToOneRelation,
                modelClass: Site,
                join: {
                    from: "reviews.siteId",
                    to: "sites.id",
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id",
                },
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: "reviews.id",
                    to: "votes.reviewId"
                }
            }
        };
    }
}

module.exports = Review;
