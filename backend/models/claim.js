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
        "Esperando respuesta del otro usuario",
        "Es tu turno de responder",
        "Contacto confirmado",
      ],
      default: "Esperando respuesta del otro usuario",
    },
    stateForItemCreator: {
      type: String,
      required: true,
      enum: [
        "Esperando respuesta del otro usuario",
        "Es tu turno de responder",
        "Contacto confirmado",
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
