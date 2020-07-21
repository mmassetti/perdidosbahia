const Item = require("../../models/item");
const Claim = require("../../models/claim");
const User = require("../../models/user");
const { transformClaim, transformItem } = require("./merge");

module.exports = {
  claims: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    //  if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    try {
      const claims = await Claim.find({
        $or: [{ itemCreator: req.userId }, { itemClaimer: req.userId }],
      });
      return claims.map((claim) => {
        return transformClaim(claim);
      });
    } catch (err) {
      throw err;
    }
  },

  createClaim: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedItem = await Item.findOne({ _id: args.itemId });

    const claimerId = req.userId;
    const creatorId = fetchedItem.creator;

    const claim = new Claim({
      item: fetchedItem._id,
      itemClaimer: claimerId,
      itemCreator: creatorId,
      //los estados se crean por defecto para ambos usuarios
    });

    //Se agrega el Claim a la lista de ambos usuarios
    const claimer = await User.findOne({ _id: claimerId });
    const creator = await User.findOne({ _id: creatorId });

    creator.claimsInvolved.push(claim);
    claimer.claimsInvolved.push(claim);
    creator.save();
    claimer.save();

    const result = await claim.save();
    return transformClaim(result);
  },

  editClaim: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedItem = await Item.findOne({ _id: args.itemId });
    const fetchedClaim = await Claim.findOne({ item: fetchedItem });
    // fetchedClaim.itemCreator = req.userId;
    fetchedClaim.itemCreator = args.itemCreatorId;
    fetchedClaim.itemClaimer = args.itemClaimerId;
    fetchedClaim.state = args.newState;
    const result = await fetchedClaim.save();
    return transformClaim(result);
  },
  cancelClaim: async (args, req) => {
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
  },
  getClaim: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    // if ()
    try {
      const claim = await Claim.findOne({ _id: args.claimId });
      return transformClaim(claim);
    } catch (err) {
      throw err;
    }
  },
};
