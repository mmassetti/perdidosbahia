const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  itemInvolved: {
    //If other user deletes a Claim
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  itemInfo: {
    //If other user deletes an Item
    type: Schema.Types.ObjectId,
    ref: "ItemInfo",
  },
  userToNotify: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
