/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
    fields: ["email"],
    identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
    static get tableName() {
        return "users";
    }

    set password(newPassword) {
        this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
    }

    authenticate(password) {
        return Bcrypt.compareSync(password, this.cryptedPassword);
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["username", "firstName", "lastName", "email"],
            properties: {
                username: { type: "string", maxLength: 36 },
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
                cryptedPassword: { type: "string" },
            },
        };
    }

    static get relationMappings() {
        const { Site, Review, Vote } = require("./index.js");
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "users.id",
                    to: "reviews.userId",
                },
            },
            sites: {
                relation: Model.HasManyRelation,
                modelClass: Site,
                join: {
                    from: "users.id",
                    to: "sites.creatorId",
                },
            },
            votes: {
                relation: Model.HasManyRelation,
                modelClass: Vote,
                join: {
                    from: "users.id",
                    to: "votes.voterId"
                }
            }
        };
    }

    $formatJson(json) {
        const serializedJson = super.$formatJson(json);

        if (serializedJson.cryptedPassword) {
            delete serializedJson.cryptedPassword;
        }

        return serializedJson;
    }
}

module.exports = User;
