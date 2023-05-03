// 1. Read in your mongoose library
const mongoose = require('mongoose');
// 2. Get the Schema class from mongoose
const Schema = mongoose.Schema;
// 3. Define the database model schema for your countries
const countrySchema = new Schema({
    countryCode: String,
    countryName: String,
    currencyCode: String,
    population: Number,
    capital: String,
    continentName: String
});

// 4. create a new mongodb model called: "countries"
const db = mongoose.model('countries', countrySchema)
// 5. make this countries model available to your app
module.exports = db;