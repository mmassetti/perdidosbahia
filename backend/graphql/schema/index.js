const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Claim {
        _id: ID!
        item: Item!
        itemCreator: User!
        itemClaimer: User!
        createdAt: String!
        updatedAt: String!
        stateForItemCreator: String!
        stateForClaimer: String!
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
        claimsInvolved: [Claim!]
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
        getClaim(claimId: ID!): Claim!
        login(email: String!, password: String  !): AuthData!
    }

    type RootMutation {
        createItem(itemInput: ItemInput): Item
        createUser(userInput: UserInput): User
        createClaim(itemId : ID!): Claim!
        editClaim(claimId: ID!, newStateForClaimer: String!, newStateForItemCreator: String!): Claim!
        cancelClaim(claimId: ID!): Item!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
