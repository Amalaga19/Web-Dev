document.getElementById('submitGuess').addEventListener('click', submitGuess);
document.getElementById('countryGuess').addEventListener('keydown', handleKeyDown);
document.getElementById('playAgain').addEventListener('click', () => location.reload());

let tries = 0;
let currentCountry = null;

fetchCountry();

async function fetchCountry() {
    try {
        const response = await fetch('/api/countries/random');
        currentCountry = await response.json();
        document.getElementById('continentHint').innerText = `Continent: ${currentCountry.continentName}`;
    } catch (error) {
        console.error('Failed to fetch country:', error);
    }
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function submitGuess() {
    const guess = document.getElementById('countryGuess').value.toLowerCase();
    if (guess === currentCountry.countryName.toLowerCase()) {
        document.getElementById('message').innerText = 'Correct!';
        document.getElementById('submitGuess').style.display = 'none';
        document.getElementById('playAgain').style.display = 'block';
    } else {
        tries++;
        if (tries === 1) {
            document.getElementById('populationHint').innerText = `Population: ${numberWithCommas(currentCountry.population)}`;
        } else if (tries === 2) {
            document.getElementById('capitalHint').innerText = `Capital: ${currentCountry.capital}`;
        } else {
            document.getElementById('message').innerText = `Wrong, the correct answer was ${currentCountry.countryName}.`;
            document.getElementById('submitGuess').style.display = 'none';
            document.getElementById('playAgain').style.display = 'block';
        }
    }
}
