var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var tripSchema = new mongoose.Schema({
  title:     {type: String, required: true},
  creator:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdOn: Date,
  albumId: String,
  description: String,
  locData: Array
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
