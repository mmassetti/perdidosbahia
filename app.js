const express = require("express");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
express.json();

const items = [];

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
          type Item {
            _id: ID!
            title: String!
            description: String!
            type: String!
            category: String!
            date: String!
          }
  
          input ItemInput {
            title: String!
            description: String!
            type: String!
            category: String!
            date: String!
          }
  
          type RootQuery {
            items: [Item!]!
          }
  
          type RootMutation {
              createItem(itemInput: ItemInput): Item
          }
  
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
    rootValue: {
      items: () => {
        return items;
      },
      createItem: args => {
        const item = {
          _id: Math.random().toString(),
          title: args.itemInput.title,
          description: args.itemInput.description,
          type: args.itemInput.type,
          category: args.itemInput.category,
          date: args.itemInput.date
        };
        items.push(item);
        return item;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
