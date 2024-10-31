async function fetchWords() {
  const response = await fetch("http://localhost:8080/words");
  const json = await response.json();
  return json;
}

function displayWords(words) {
  const wordsContainer = document.getElementById("wordsContainer");
  wordsContainer.innerHTML = "";

  words.forEach((word) => {
    const wordElement = document.createElement("div");
    wordElement.classList.add("word");
    wordElement.textContent = `${word.KoreanWord} - ${word.PortugueseWord}`;
    wordsContainer.appendChild(wordElement);
  });
}

async function fetchAndDisplayWords() {
  const words = await fetchWords();
  if (words) {
    displayWords(words);
  }
}

fetchAndDisplayWords();
