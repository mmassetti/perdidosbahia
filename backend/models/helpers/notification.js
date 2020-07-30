const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  claimInvolved: {
    type: Schema.Types.ObjectId,
    ref: "Claim",
    required: true,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
