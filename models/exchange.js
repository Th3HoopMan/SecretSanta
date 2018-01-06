const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const ExchangeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  matchDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true
  },
  owner: {
    type: Object,
  },
  description: {
    type: String,
  },
  maxParticipants: {
    type: Number,
  },
  usersParticipating: {
    type: Array,
  }
});

const Exchange = module.exports = mongoose.model('Exchange', ExchangeSchema);

module.exports.addExchange = function(newExchange, callback){
      newExchange.save(callback);
}

//needs route made and testing
module.exports.getExchangeById = function(id, callback){
  Exchange.findById(id, callback);
}

//needs route made and testing
module.exports.getAllExchanges = function(callback){
  Exchange.find({}, callback);
}

//needs route made and testing
module.exports.deleteExhcnage = function(exchangeID, callback){

  Exchange.remove(exchangeID, callback);
}

//needs route made and testing
module.exports.updateExchange = function(oldExchange, updatedExchange, callback){
  Exchange.remove(oldExchange, updatedExchange, callback);
}
