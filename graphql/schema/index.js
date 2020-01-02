const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Claim {
        _id: ID!
        item: Item!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
        
    type Item {
        _id: ID!
        description: String!
        type: String!
        category: String!
        date: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        createdItems: [Item!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input ItemInput {
        description: String!
        type: String!
        category: String!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        items: [Item!]!
        claims: [Claim!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createItem(itemInput: ItemInput): Item
        createUser(userInput: UserInput): User
        claimItem(itemId: ID!): Claim!
        cancelClaim(claimId: ID!): Item!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
