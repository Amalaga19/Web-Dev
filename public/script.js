
/*
const hintEl = document.getElementById('hint');
const guessEl = document.getElementById('guess');
const submitBtn = document.getElementById('submit');
const playAgainBtn = document.getElementById('playAgain');
const guessedCountriesEl = document.getElementById('guessedCountries');
const guessedCountEl = document.getElementById('guessedCount');
const continentModal = document.getElementById('continentModal');
const continentStats = document.getElementById('continentStats');
const closeModal = document.querySelector('.close');

const continents = {
    'Africa': 0,
    'Asia': 0,
    'Europe': 0,
    'North America': 0,
    'Oceania': 0,
    'South America': 0
};

const getGuessedCountryCodes = () => {
    const guessedCountryCodes = localStorage.getItem('guessedCountryCodes');
    return guessedCountryCodes ? JSON.parse(guessedCountryCodes) : [];
};

const addGuessedCountryCode = (countryCode) => {
    const guessedCountryCodes = getGuessedCountryCodes();
    guessedCountryCodes.push(countryCode);
    localStorage.setItem('guessedCountryCodes', JSON.stringify(guessedCountryCodes));
};

let countryCode;
let hintIndex = 0;
const hintsOrder = ['continentName', 'population', 'capital', 'countryCode'];

const showNextHint = (country) => {
    if (hintIndex >= hintsOrder.length) {
        hintEl.innerHTML = 'No more hints available.';
        return;
    }
    const hintKey = hintsOrder[hintIndex];
    hintEl.innerHTML = `<strong>${hintKey}:</strong> ${country[hintKey]}`;
    hintIndex++;
};

const getRandomCountry = async () => {
    try {
        const guessedCountryCodes = getGuessedCountryCodes();
        const response = await fetch('/api/countries/random', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guessedCountryCodes })
        });

        if (response.status === 404) {
            hintEl.innerHTML = 'All countries have been guessed! Clearing the list and starting over.';
            localStorage.removeItem('guessedCountryCodes');
            setTimeout(getRandomCountry, 2000);
            return;
        }

        const country = await response.json();
        countryCode = country.countryCode;
        showNextHint(country);
    } catch (err) {
        console.error(err);
    }
};

const checkGuess = async () => {
    const guess = guessEl.value;
    if (!guess) {
        alert('Please enter a guess.');
        return;
    }

    try {
        const response = await fetch(`/api/countries/check/${countryCode}/${guess}`);
        const result = await response.json();

        if (result.isCorrect) {
            addGuessedCountryCode(countryCode);
            hintEl.innerHTML = `<strong>Correct!</strong> The country is ${guess}.`;
            submitBtn.hidden = true;
            playAgainBtn.hidden = false;
            updateGuessedCountries();
        } else {
            alert('Incorrect. Try again.');
            showNextHint(country);
        }
    } catch (err) {
        console.error(err);
    }
};

const updateGuessedCountries = async () => {
    const guessedCountryCodes = getGuessedCountryCodes();
    guessedCountEl.textContent = guessedCountryCodes.length;

    const response = await fetch('/api/countries');
    const allCountries = await response.json();
    const guessedCountries = allCountries.filter(country => guessedCountryCodes.includes(country.countryCode));

    for (const continent in continents) {
        continents[continent] = guessedCountries.filter(country => country.continentName === continent).length;
    }

    let statsHTML = '';
    for (const continent in continents) {
        const totalCount = allCountries.filter(country => country.continentName === continent).length;
        const completedClass = continents[continent] === totalCount ? 'completed-continent' : '';
        statsHTML += `<p class="${completedClass}">${continent}: ${continents[continent]}/${totalCount}</p>`;
    }
    continentStats.innerHTML = statsHTML;
};

submitBtn.addEventListener('click', checkGuess);
guessEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

playAgainBtn.addEventListener('click', () => {
    hintIndex = 0;
    getRandomCountry();
    submitBtn.hidden = false;
    playAgainBtn.hidden = true;
});

guessedCountriesEl.addEventListener('click', () => {
    continentModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    continentModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === continentModal) {
        continentModal.style.display = 'none';
    }
});

getRandomCountry();
updateGuessedCountries();
*/