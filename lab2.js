"use strict";
const contentDiv = document.getElementById("content");
if (contentDiv !== null) {
    let elements1 = [];
    // Set input box and its default value
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.value = "https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt";
    elements1.push(inputBox);
    // Set button
    const goButton = document.createElement("input");
    goButton.setAttribute("type", "button");
    goButton.value = "Go!";
    elements1.push(goButton);
    // Display input box and button
    contentDiv.replaceChildren(...elements1);
    goButton.addEventListener('click', () => {
        if (inputBox.value !== '') {
            // If input box is not empty
            let xhr = new XMLHttpRequest();
            xhr.open('GET', inputBox.value, true);
            xhr.send();
            xhr.onload = () => {
                let words = xhr.responseText.split("\n");
                const randomIndex = Math.floor(Math.random() * words.length);
                // Obtain random word and print in console
                const toGuess = words[randomIndex];
                console.log(toGuess);
                let elements2 = [];
                // Set new input box for guessing
                const guessBox = document.createElement("input");
                guessBox.setAttribute("type", "text");
                elements2.push(guessBox);
                // Set text with the alphabet
                const Alphabet = document.createElement("p");
                Alphabet.textContent = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
                elements2.push(Alphabet);
                // Display guess box and alphabet
                contentDiv.replaceChildren(...elements2);
                // Set maximum number of guesses
                let guessesLeft = 6;
                guessBox.addEventListener('keypress', (k) => {
                    if (k.key === 'Enter') {
                        // If Enter key is pressed
                        if (guessBox.value.length !== 5) {
                            // If input box does not have exactly five characters
                            alert("Guess should have exactly 5 characters");
                        }
                        else {
                            // If guess box input is valid
                            const recentGuess = guessBox.value;
                            // Guess box content is cleared
                            guessBox.value = "";
                            // Setup to display the typed word/guess
                            const guessed = document.createElement("p");
                            guessed.textContent = recentGuess;
                            // To check the letters of the guess
                            let newGuessed = [];
                            let guessedArr = guessed.textContent.split("");
                            let toGuessArr = toGuess.split("");
                            for (let g = 0; g < 5; g++) {
                                if (guessedArr[g] == toGuessArr[g]) {
                                    // Letter is in word and is in correct spot
                                    const letter = document.createElement("span");
                                    letter.classList.add("correct");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                                else if (toGuess.indexOf(guessedArr[g]) !== -1) {
                                    // Letter is in word but not in correct spot
                                    const letter = document.createElement("span");
                                    letter.classList.add("misplaced");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                                else {
                                    // Letter is not in word
                                    const letter = document.createElement("span");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                            }
                            // Display guessed word with a break after
                            elements2.push(...newGuessed);
                            elements2.push(document.createElement("br"));
                            contentDiv.replaceChildren(...elements2);
                            if (recentGuess === toGuess) {
                                // If guess is correct
                                alert("Player guessed correctly!");
                                guessBox.disabled = true;
                            }
                            else if (guessesLeft === 1) {
                                // If guess is incorrect, and no more valid guesses left
                                alert("Game over! Correct answer was: " + toGuess.toUpperCase());
                                guessBox.disabled = true;
                            }
                            else {
                                // If guess is incorrect, but still has valid guesses left
                                guessesLeft--;
                            }
                        }
                    }
                });
            };
        }
        else {
            // If input box is empty
            alert("No URL was specified");
        }
    });
}
