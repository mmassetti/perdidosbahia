const Item = require("../../models/item");
const User = require("../../models/user");
const Claim = require("../../models/claim");

const { transformItem } = require("./merge");

async function deleteClaim(args) {
  try {
    await Claim.deleteOne({ _id: args._id });
    const claimer = await User.findOne({ _id: args.itemClaimer });
    const creator = await User.findOne({ _id: args.itemCreator });
    claimer.claimsInvolved.pull(args._id);
    creator.claimsInvolved.pull(args._id);
    claimer.save();
    creator.save();
  } catch (err) {
    throw err;
  }
}

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
      date: new Date(args.itemInput.date),
      itemCreatorQuestion: args.itemInput.itemCreatorQuestion,
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
  deleteItem: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const item = await Item.findById(args.itemId);

      const creator = await User.findOne({ _id: item.creator });
      creator.createdItems.pull(item._id);
      creator.save();
      await Item.deleteOne({ _id: item._id });

      //Delete Claims asocciated to Item
      const claims = await Claim.find({ item: item._id });
      claims.map(async (claim) => {
        await deleteClaim(claim);
      });

      return args.itemId;
    } catch (err) {
      throw err;
    }
  },
};
