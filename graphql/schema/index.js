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
        location: String
        ownerQuestion: String
        claimerQuestion: String
        creator: User!
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String
        phoneNumber: String
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
        location: String
        ownerQuestion: String
        claimerQuestion: String
    }

    input UserInput {
        email: String!
        firstName: String!
        lastName: String!
        password: String!
        phoneNumber: String
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
