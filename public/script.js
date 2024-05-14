// This script is responsible for fetching a random country from the API and handling the user's guesses.

// Event listeners
document.getElementById('submitGuess').addEventListener('click', submitGuess); // When the user clicks the submit button, the submitGuess function is called.
document.getElementById('countryGuess').addEventListener('keydown', handleKeyDown);
document.getElementById('playAgain').addEventListener('click', () => location.reload()); // Reload the page when the user clicks the play again button.

let tries = 0;
let currentCountry = null;

fetchCountry();

// This function fetches a random country from the API and updates the continent hint.
async function fetchCountry() {
    try {
        const response = await fetch('/api/countries/random');
        currentCountry = await response.json();
        document.getElementById('continentHint').innerText = `Continent: ${currentCountry.continentName}`;
    } catch (error) {
        console.error('Failed to fetch country:', error);
    }
}

// This function lets the user submit their guess by pressing the Enter key. It also can be submitted by clicking the submit button.
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
}

// This function formats the country's population number.
function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// This function checks if the user's guess is correct and provides further hints if the guess is wrong.
function submitGuess() {
    const guess = document.getElementById('countryGuess').value.toLowerCase();
    if (guess === currentCountry.countryName.toLowerCase()) { // If the user's guess is correct, the user wins and the submit button is replaced with a play again button.
        document.getElementById('message').innerText = 'Correct!';
        document.getElementById('submitGuess').style.display = 'none';
        document.getElementById('playAgain').style.display = 'block';
    } else {
        // If the user's guess is wrong, the user is given further hints about the country.
        tries++;
        if (tries === 1) {
            document.getElementById('populationHint').innerText = `Population: ${numberWithCommas(currentCountry.population)}`;
        } else if (tries === 2) {
            document.getElementById('capitalHint').innerText = `Capital: ${currentCountry.capital}`;
        } else { // If the user already has seen the three hints and still hasn't guessed the user "loses" and the correct answer is shown.
            document.getElementById('message').innerText = `Wrong, the correct answer was ${currentCountry.countryName}.`;
            document.getElementById('submitGuess').style.display = 'none';
            document.getElementById('playAgain').style.display = 'block';
        }
    }
}
