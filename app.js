const express = require("express");
const graphqlHttp = require("express-graphql");
const moongose = require("mongoose");
const cors = require("cors");
let path = require("path");
let compression = require("compression");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const app = express();
require("dotenv").config();

express.json();

app.use(compression);
app.use(cors());

// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

moongose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-lghy1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    // app.listen(8000);
    app.listen(process.env.PORT || 8000, function () {
      console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
