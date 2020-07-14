const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const claimSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item"
    },
    claimerUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
