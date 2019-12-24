const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
