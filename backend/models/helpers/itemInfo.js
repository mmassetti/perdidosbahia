const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemInfoSchema = new Schema({
  //Schema used if other user deletes Item so I cannot use it.
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ItemInfo", itemInfoSchema);
