const express = require("express");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const moongose = require("mongoose");
const Item = require("./models/item");

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
        return Item.find()
          .then(events => {
            return events;
          })
          .catch(err => {
            throw err;
          });
      },
      createItem: args => {
        const item = new Item({
          title: args.itemInput.title,
          description: args.itemInput.description,
          type: args.itemInput.type,
          category: args.itemInput.category,
          date: new Date(args.itemInput.date)
        });
        return item
          .save()
          .then(result => {
            console.log(result);
            return result;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);

moongose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-lghy1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
