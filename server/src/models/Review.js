const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get relationMappings() {
        const { User, Site } = require("./index.js")
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            sites: {
                relation: Model.BelongsToOneRelation,
                modelClass: Site,
                join: {
                    from: "reviews.siteId",
                    to: "sites.id"
                }
            }
        }
    }
}

module.exports = Review