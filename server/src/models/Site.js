const Model = require("./Model.js");

class Site extends Model {
  static get tableName() {
    return "sites";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "address", "description"],
      properties: {
        name: { type: "string" },
        address: { type: "string" },
        description: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { User, Review } = require("./index.js");
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "sites.id",
          through: {
            from: "reviews.siteId",
            to: "reviews.userId",
          },
          to: "users.id",
        },
      },

      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "sites.id",
          to: "reviews.siteId",
        },
      },
    };
  }
}

module.exports = Site;
