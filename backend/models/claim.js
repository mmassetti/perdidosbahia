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
        "EsperandoRespuestaOtroUsuario",
        "EsperandoRespuestaMia",
        "EnContacto",
      ],
      default: "EsperandoRespuestaOtroUsuario",
    },
    stateForItemOwner: {
      type: String,
      required: true,
      enum: [
        "EsperandoRespuestaOtroUsuario",
        "EsperandoRespuestaMia",
        "EnContacto",
      ],
      default: "EsperandoRespuestaMia",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
