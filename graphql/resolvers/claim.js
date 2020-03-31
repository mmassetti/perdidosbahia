const Item = require("../../models/item");
const Claim = require("../../models/claim");
const { transformClaim, transformItem } = require("./merge");

module.exports = {
  claims: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    try {
      const claims = await Claim.find();
      return claims.map(claim => {
        return transformClaim(claim);
      });
    } catch (err) {
      throw err;
    }
  },
  claimItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedItem = await Item.findOne({ _id: args.itemId });
    const claim = new Claim({
      claimerUser: req.userId,
      item: fetchedItem
    });
    const result = await claim.save();
    return transformClaim(result);
  },
  cancelItem: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const claim = await Claim.findById(args.claimId).populate("item");
      const item = transformItem(claim.item);
      await Claim.deleteOne({ _id: args.claimId });
      return item;
    } catch (err) {
      throw err;
    }
  }
};
