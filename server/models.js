const mongoose = require('mongoose');
const { Schema } = mongoose;
const countrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
  });
  
  
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



  const UserSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender:{
      type: String,
      required: true,
  
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type:String,
      required: true,
    },
    state: {
     type:String,
      required: true,
    },
  
    city: {
      type:String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
      },
    age : {
      type: Number,
      required: true,
      },
  
  
  });
  
  
  const User = mongoose.model('User', UserSchema);


  
  const Country = mongoose.model('Country', countrySchema);
  const State = mongoose.model('State', stateSchema);
  const City = mongoose.model('City', citySchema);

module.exports = { Country, State, City ,User};