const authResolver = require("./auth");
const itemsResolver = require("./items");
const claimResolver = require("./claim");

const rootResolver = {
  ...authResolver,
  ...itemsResolver,
  ...claimResolver,
};

module.exports = rootResolver;
