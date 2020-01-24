const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    //Perdido o encontrado
    type: String,
    required: true
  },
  category: {
    //Llaves, documentos, lentes, etc
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
    // default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  question: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Item", itemSchema);
