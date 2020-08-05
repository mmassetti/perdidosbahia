const Item = require("../../models/item");
const User = require("../../models/user");
const Claim = require("../../models/claim");

const { transformItem } = require("./merge");
const Notification = require("../../models/helpers/notification");
const ItemInfo = require("../../models/helpers/itemInfo");

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
    } catch (error) {
      throw err;
    }
  },
  userItemsWithoutClaim: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const user = await User.findOne({ _id: req.userId });

      const userClaims = await Claim.find({
        $or: [{ itemCreator: req.userId }, { itemClaimer: req.userId }],
      });

      let itemsWithClaims = [];

      for (const claim of userClaims) {
        if (claim.itemCreator == req.userId) {
          const itemToAdd = await Item.findOne({ _id: claim.item });
          itemsWithClaims.push(itemToAdd._id);
        }
      }

      const userItemsWithoutClaim = await Item.find({
        $and: [{ creator: req.userId }, { _id: { $nin: itemsWithClaims } }],
      });

      return userItemsWithoutClaim.map((item) => {
        return transformItem(item);
      });
    } catch (err) {
      throw err;
    }
  },

  getItem: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const fetchedItem = await Item.findOne({ _id: args.itemId });
      const creatorId = fetchedItem.creator;

      const isUserAuthorized = req.userId == creatorId;

      if (isUserAuthorized) {
        return transformItem(fetchedItem);
      }
      return new Error("Permission denied");
    } catch (err) {
      throw err;
    }
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
  editItem: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const fetchedItem = await Item.findOne({ _id: args.itemId });
      const itemCreator = fetchedItem.creator;

      const isUserAuthorized = req.userId == itemCreator._id;
      if (isUserAuthorized) {
        fetchedItem.description = args.newItemInput.description;
        fetchedItem.type = args.newItemInput.type;
        fetchedItem.category = args.newItemInput.category;

        fetchedItem.location = args.newItemInput.location;
        fetchedItem.date = new Date(args.newItemInput.date);
        fetchedItem.itemCreatorQuestion = args.newItemInput.itemCreatorQuestion;
        const result = await fetchedItem.save();
        const modifiedItem = transformItem(result);

        //Update Claims asocciated to Item
        const claims = await Claim.find({ item: fetchedItem._id });
        claims.map(async (claim) => {
          claim.item = fetchedItem._id;
          await claim.save();
        });
        return modifiedItem;
      }
      return new Error("Permission denied");
    } catch (err) {
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
      const isUserAuthorized = req.userId == creator._id;

      if (isUserAuthorized) {
        creator.createdItems.pull(item._id);
        creator.save();

        const itemInfo = new ItemInfo({
          description: item.description,
          category: item.category,
        });

        //Delete Claims associated to Item and notify claimers
        const claims = await Claim.find({ item: item._id });
        if (claims.length > 0) {
          itemInfo.save();
        }
        claims.map(async (claim) => {
          const userClaimer = await User.findOne({ _id: claim.itemClaimer });

          const notification = new Notification({
            description: args.notificationDescription,
            itemInfo: itemInfo,
            userToNotify: userClaimer,
          });

          await notification.save();

          userClaimer.notifications.push(notification);
          await userClaimer.save();
          await deleteClaim(claim);
        });

        //Delete Item
        await Item.deleteOne({ _id: item._id });

        return args.itemId;
      }
      return new Error("Permission denied");
    } catch (err) {
      throw err;
    }
  },
};
