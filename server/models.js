const mongoose = require('mongoose');
// Define the country schema
const countrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  // Define the state schema
  const stateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
  });
  
  // Define the city schema
  const citySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
  });
  
  // Create the models
  const Country = mongoose.model('Country', countrySchema);
  const State = mongoose.model('State', stateSchema);
  const City = mongoose.model('City', citySchema);

  // Export the models
module.exports = { Country, State, City };