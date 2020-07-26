const DataLoader = require("dataloader");
const Item = require("../../models/item");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const itemLoader = new DataLoader((itemIds) => {
  return items(itemIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const items = async (itemIds) => {
  try {
    const items = await Item.find({ _id: { $in: itemIds } });
    items.sort((a, b) => {
      return (
        itemIds.indexOf(a._id.toString()) - itemIds.indexOf(b._id.toString())
      );
    });
    return items.map((item) => {
      return transformItem(item);
    });
  } catch (err) {
    throw err;
  }
};

const singleItem = async (itemId) => {
  try {
    const item = await itemLoader.load(itemId.toString());
    return item;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdItems: () => itemLoader.loadMany(this, user._doc.createdItems),
      claimsInvoled: () => itemLoader.loadMany(this, user._doc.claimsInvoled),
    };
  } catch (err) {
    throw err;
  }
};

const transformItem = (item) => {
  return {
    ...item._doc,
    _id: item.id,
    date: dateToString(item._doc.date),
    creator: user.bind(this, item.creator),
  };
};

const transformClaim = (claim) => {
  return {
    ...claim._doc,
    _id: claim.id,
    itemCreator: user.bind(this, claim._doc.itemCreator),
    itemClaimer: user.bind(this, claim._doc.itemClaimer),
    item: singleItem.bind(this, claim._doc.item),
    createdAt: dateToString(claim._doc.createdAt),
    updatedAt: dateToString(claim._doc.updatedAt),
  };
};

exports.transformItem = transformItem;
exports.transformClaim = transformClaim;
