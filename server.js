const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Load the JSON data into an array
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.json'), 'utf8')); 

// This function returns a random country from the countries array.
function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

// Set up express to handle JSON data
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set static server
app.use(express.static(publicURL));

// Set static html file
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html"));
});

// Set up an API endpoint to fetch a random country
app.get('/api/countries/random', (req, res) => {
    try {
        const randomCountry = getRandomCountry();
        res.json(randomCountry);
    } catch (error) {
        console.error('Failed to fetch a random country:', error);
        res.status(500).send('Internal server error');
    }
});

// Start listening
app.listen(PORT, () => {
    console.log(`see the magic: http://localhost:${PORT}`);
});
