const Item = require("../../models/item");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const items = async itemIds => {
  try {
    const items = await Item.find({ _id: { $in: itemIds } });
    return items.map(item => {
      return transformItem(item);
    });
  } catch (err) {
    throw err;
  }
};

const singleItem = async itemId => {
  try {
    const item = await Item.findById(itemId);
    return transformItem(item);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdItems: items.bind(this, user._doc.createdItems)
    };
  } catch (err) {
    throw err;
  }
};

const transformItem = item => {
  return {
    ...item._doc,
    _id: item.id,
    date: dateToString(item._doc.date),
    creator: user.bind(this, item.creator)
  };
};

const transformClaim = claim => {
  return {
    ...claim._doc,
    _id: claim.id,
    claimerUser: user.bind(this, claim._doc.claimerUser),
    item: singleItem.bind(this, claim._doc.item),
    createdAt: dateToString(claim._doc.createdAt),
    updatedAt: dateToString(claim._doc.updatedAt)
  };
};

exports.transformItem = transformItem;
exports.transformClaim = transformClaim;
