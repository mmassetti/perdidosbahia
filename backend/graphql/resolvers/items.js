const Item = require("../../models/item");
const User = require("../../models/user");
const Claim = require("../../models/claim");

const { transformItem } = require("./merge");

module.exports = {
  items: async () => {
    try {
      const items = await Item.find();
      return items.map((item) => {
        return transformItem(item);
      });
    } catch (error) {}
  },
  createItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const item = new Item({
      description: args.itemInput.description,
      type: args.itemInput.type,
      category: args.itemInput.category,
      location: args.itemInput.location ? args.itemInput.location : null,
      itemCreatorQuestion: args.itemInput.creatorQuestion
        ? args.itemInput.creatorQuestion
        : null,
      claimerQuestion: args.itemInput.claimerQuestion
        ? args.itemInput.claimerQuestion
        : null,
      date: new Date(args.itemInput.date),
      creator: req.userId,
    });

    let createdItem;
    try {
      const result = await item.save();
      createdItem = transformItem(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdItems.push(item);
      await creator.save();

      return createdItem;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
