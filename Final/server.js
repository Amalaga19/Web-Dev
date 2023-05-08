const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// ---- Load local JSON data here ----
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.json'), 'utf8'));

// --- Get a random country from the JSON data ---
function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

// Handle data in a nice way
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// Set your static html file
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/views/index.html"));
});

// ---- ADD YOUR API ENDPOINTS HERE ----
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
