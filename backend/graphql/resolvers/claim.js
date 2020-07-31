const Item = require("../../models/item");
const Claim = require("../../models/claim");
const User = require("../../models/user");
const Notification = require("../../models/helpers/notification");
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

      if (claimerId == creatorId) {
        return new Error("Cannot create a Claim for an Item that you created");
      }

      const sharedClaimBetweenUsers = await Claim.findOne({
        $and: [{ itemClaimer: claimerId }, { itemCreator: creatorId }],
      });

      const alreadyExitsClaimForClaimer =
        sharedClaimBetweenUsers && sharedClaimBetweenUsers.item == args.itemId;

      if (!alreadyExitsClaimForClaimer) {
        const claim = new Claim({
          item: fetchedItem._id,
          itemClaimer: claimerId,
          itemCreator: creatorId,
          claimerQuestion: args.claimerQuestion,
          claimerAnswer: args.claimerAnswer,
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
      }
      return new Error("Already exits a Claim for this Item and these Users");
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
      const claimerId = fetchedClaim.itemClaimer;

      const creatorId = fetchedClaim.itemCreator;

      const isUserAuthorized =
        req.userId == claimerId || req.userId == creatorId;

      if (isUserAuthorized) {
        fetchedClaim.stateForClaimer = args.newStateForClaimer;
        fetchedClaim.stateForItemCreator = args.newStateForItemCreator;
        fetchedClaim.flagClaimer = args.newFlagClaimer;
        fetchedClaim.flagItemCreator = args.newFlagItemCreator;
        fetchedClaim.claimerQuestion = args.newClaimerQuestion
          ? args.newClaimerQuestion
          : fetchedClaim.claimerQuestion;
        fetchedClaim.claimerAnswer = args.newClaimerAnswer
          ? args.newClaimerAnswer
          : fetchedClaim.claimerAnswer;
        fetchedClaim.itemCreatorAnswer = args.newItemCreatorAnswer
          ? args.newItemCreatorAnswer
          : fetchedClaim.itemCreatorAnswer;
        const result = await fetchedClaim.save();
        return transformClaim(result);
      }
      return new Error("Permission denied");
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
      const claimerId = claim.itemClaimer;
      const creatorId = claim.itemCreator;

      const isUserAuthorized =
        req.userId == claimerId || req.userId == creatorId;

      if (isUserAuthorized) {
        const item = transformItem(claim.item);

        //Notify other user
        const claimer = await User.findOne({ _id: claim.itemClaimer });
        const creator = await User.findOne({ _id: claim.itemCreator });

        const notification = new Notification({
          description: args.notificationDescription,
          itemInvolved: claim.item,
          userToNotify: claim.item.creator == req.userId ? claimer : creator,
        });

        notification.save();

        if (req.userId == claimerId) {
          claimer.notifications.push(notification);
        } else {
          creator.notifications.push(notification);
        }

        //Delete Claims from users lists
        claimer.claimsInvolved.pull(claim._id);
        creator.claimsInvolved.pull(claim._id);
        claimer.save();
        creator.save();

        await Claim.deleteOne({ _id: args.claimId });

        return item;
      }
      return new Error("Permission denied");
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
