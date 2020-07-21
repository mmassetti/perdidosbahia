const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  type: {
    //Perdido o encontrado
    type: String,
    required: true,
  },
  category: {
    //Llaves, documentos, lentes, etc
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ownerQuestion: {
    type: String,
  },
  claimerQuestion: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Item", itemSchema);