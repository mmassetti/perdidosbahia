const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    //Llaves, documentos,etc
    type: String,
    required: true
  },
  category: {
    //Perdido o encontrado
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Item", itemSchema);
