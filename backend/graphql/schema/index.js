const { buildSchema } = require("graphql");

module.exports = buildSchema(`   
    type Item {
        _id: ID!
        description: String!
        type: String!
        category: String!
        date: String!
        location: String
        itemCreatorQuestion: String!
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
        firstName: String
    }

    type Claim {
        _id: ID!
        item: Item!
        itemCreator: User!
        itemClaimer: User!
        createdAt: String!
        updatedAt: String!
        stateForItemCreator: String!
        stateForClaimer: String!
        flagClaimer: Int!
        flagItemCreator: Int!
        claimerQuestion: String!
        itemCreatorAnswer: String
        claimerAnswer: String
    }

    input ItemInput {
        description: String!
        type: String!
        category: String!
        date: String!
        location: String
        itemCreatorQuestion: String!
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
        createUser(userInput: UserInput): User
        createItem(itemInput: ItemInput): Item
        editItem(itemId: ID!, newItemInput: ItemInput): Item
        deleteItem(itemId: ID!): ID
        createClaim(itemId : ID!, claimerQuestion: String!, claimerAnswer: String!): Claim!
        editClaim(claimId: ID!, newStateForClaimer: String!, newStateForItemCreator: String!,newFlagClaimer: Int!, newFlagItemCreator: Int!, newClaimerQuestion: String, newClaimerAnswer: String, newItemCreatorAnswer: String): Claim!
        cancelClaim(claimId: ID!): Item!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
