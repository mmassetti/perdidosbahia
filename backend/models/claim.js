const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const claimSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    claimerUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    state: {
      type: String,
      required: true,
      enum: [
        "SinRespuestas",
        "EsperandoRespuestaOtroUsuario",
        "EsperandoRespuestaUsuario",
      ],
      default: "SinRespuestas",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
