const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const config = require('./config');

const PORT = config.PORT;

// ---- Connect to mongodb here ----
// read in mongoose library
const mongoose = require('mongoose');
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// --- connect to your collection ---

const countries = require ('./models/allCountries');

// Handle data in a nice way
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// Set your static html file
app.get("/", (req, res) => {
  res.sendFile( path.resolve(__dirname + "/views/index.html"))
});

// ---- ADD YOUR API ENDPOINTS HERE ----
// ---- ADD YOUR API ENDPOINTS HERE ----
// GET: "api/v1/countries"
app.get("/api/v1/countries", async (req, res) => {
    try{
      //const data = await countries.find();
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // POST: "api/v1/countries"
  app.post("/api/v1/countries", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // PUT: "api/v1/countries:id"
  app.put("/api/v1/countries/:id", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });
  
  // DELETE: "api/v1/countries:id"
  app.delete("/api/v1/countries/:id", async (req, res) => {
    try{
      res.json({})
    } catch(error){
      console.error(error);
      res.json(error);
    }
  });

// Start listening
app.listen(PORT, () => {
  console.log(`see the magic: http://localhost:${PORT}`);
})

/*
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Country schema
const countrySchema = new mongoose.Schema({
    countryCode: String,
    countryName: String,
    currencyCode: String,
    population: Number,
    capital: String,
    continentName: String
});

const Country = mongoose.model('Country', countrySchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Get a random country
app.post('/api/countries/random', async (req, res) => {
    try {
        const guessedCountryCodes = req.body.guessedCountryCodes || [];
        const totalCountries = await Country.countDocuments({ countryCode: { $nin: guessedCountryCodes } });
        if (totalCountries === 0) {
            res.status(404).send('No more countries available');
            return;
        }
        const randomIndex = Math.floor(Math.random() * totalCountries);
        const randomCountry = await Country.findOne({ countryCode: { $nin: guessedCountryCodes } }).skip(randomIndex);
        res.status(200).send(randomCountry);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all countries
app.get('/api/countries', async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).send(countries);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Check if a country name matches a given country code
app.get('/api/countries/check/:countryCode/:guess', async (req, res) => {
    try {
        const country = await Country.findOne({ countryCode: req.params.countryCode });
        if (!country) {
            res.status(404).send('Country not found');
            return;
        }
        const isCorrect = country.countryName.toLowerCase() === req.params.guess.toLowerCase();
        res.status(200).send({ isCorrect });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/