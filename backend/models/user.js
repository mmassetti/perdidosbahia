const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  createdItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  claimsInvolved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Claim",
    },
  ],
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  hasPendingNotificiations: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
