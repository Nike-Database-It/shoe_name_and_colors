const mongoose = require('mongoose');

require('./connection.js');

const shoeTitleSchema = new mongoose.Schema({
  id: Number,
  shoeID: { type: String, unique: true },
  shoeName: String,
  shoeColors: [String],
  price: String,
  shoeLine: String,
  shoeType: String,
  image: String,
});

const Shoe = mongoose.model('ShoeInfo', shoeTitleSchema);

module.exports = Shoe;
