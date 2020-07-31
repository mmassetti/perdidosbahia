const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  itemInvolved: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  userToNotify: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
