const authResolver = require("./auth");
const itemsResolver = require("./items");
const claimResolver = require("./claim");
const notificationResolver = require("./notification");

const rootResolver = {
  ...authResolver,
  ...itemsResolver,
  ...claimResolver,
  ...notificationResolver,
};

module.exports = rootResolver;
