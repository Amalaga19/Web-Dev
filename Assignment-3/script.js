const wordInput = document.getElementById("word-input");
const searchBtn = document.getElementById("search-btn");
const resultDiv = document.getElementById("result");

wordInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  if (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((data) => displayData(data))
      .catch((error) => console.error(error));
  }
});

function displayData(data) {
  resultDiv.innerHTML = "";
  if (Array.isArray(data)) {
    data.forEach((entry) => {
      const meanings = entry.meanings;
      for (let i = 0; i < meanings.length; i++) {
        const partOfSpeech = document.createElement("p");
        partOfSpeech.innerHTML = '<span class="bold-text">Part of speech:</span> ' + meanings[i].partOfSpeech;
        resultDiv.appendChild(partOfSpeech);

        const definitions = meanings[i].definitions;
        for (let j = 0; j < definitions.length; j++) {
          const definition = document.createElement("p");
          definition.innerHTML = '<span class="bold-text">Definition:</span> ' + definitions[j].definition;
          resultDiv.appendChild(definition);
        }
      }
    });
  } else {
    const errorText = document.createElement("p");
    errorText.textContent = "Sorry, the word was not found.";
    resultDiv.appendChild(errorText);
  }
}
