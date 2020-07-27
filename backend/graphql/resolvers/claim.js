const Item = require("../../models/item");
const Claim = require("../../models/claim");
const User = require("../../models/user");
const { transformClaim, transformItem } = require("./merge");

module.exports = {
  claims: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
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

    try {
      const fetchedItem = await Item.findOne({ _id: args.itemId });

      const claimerId = req.userId;
      const creatorId = fetchedItem.creator;

      const claim = new Claim({
        item: fetchedItem._id,
        itemClaimer: claimerId,
        itemCreator: creatorId,
        claimerQuestion: args.claimerQuestion,
        //los estados y los flags se crean por defecto para ambos usuarios
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
    } catch (err) {
      throw err;
    }
  },

  editClaim: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const fetchedClaim = await Claim.findOne({ _id: args.claimId });
      fetchedClaim.stateForClaimer = args.newStateForClaimer;
      fetchedClaim.stateForItemCreator = args.newStateForItemCreator;
      fetchedClaim.flagClaimer = args.newFlagClaimer;
      fetchedClaim.flagItemCreator = args.newFlagItemCreator;
      fetchedClaim.claimerQuestion = args.newClaimerQuestion
        ? args.newClaimerQuestion
        : fetchedClaim.claimerQuestion;
      const result = await fetchedClaim.save();
      return transformClaim(result);
    } catch (err) {
      throw err;
    }
  },

  cancelClaim: async (args, req) => {
    //TODO: Agarrar el error en el frontend y mostrar lo MustLoginModal
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const claim = await Claim.findById(args.claimId).populate("item");
      const item = transformItem(claim.item);
      await Claim.deleteOne({ _id: args.claimId });

      //Delete Claims from users lists
      const claimer = await User.findOne({ _id: claim.itemClaimer });
      const creator = await User.findOne({ _id: claim.itemCreator });

      claimer.claimsInvolved.pull(claim._id);
      creator.claimsInvolved.pull(claim._id);
      claimer.save();
      creator.save();

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
    try {
      const claim = await Claim.findOne({ _id: args.claimId });
      return transformClaim(claim);
    } catch (err) {
      throw err;
    }
  },
};
