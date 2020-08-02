const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const claimSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    itemClaimer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    itemCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    stateForClaimer: {
      type: String,
      required: true,
      enum: [
        "Es turno del otro usuario para responder",
        "Es tu turno de responder",
        "Ya estás en contacto con la otra persona",
      ],
      default: "Es turno del otro usuario para responder",
    },
    stateForItemCreator: {
      type: String,
      required: true,
      enum: [
        "Es turno del otro usuario para responder",
        "Es tu turno de responder",
        "Ya estás en contacto con la otra persona",
      ],
      default: "Es tu turno de responder",
    },
    flagClaimer: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 0,
    },
    flagItemCreator: {
      type: Number,
      required: true,
      enum: [0, 1],
      default: 1,
    },
    claimerQuestion: {
      type: String,
      required: true,
    },
    claimerAnswer: {
      type: String,
    },
    itemCreatorAnswer: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
