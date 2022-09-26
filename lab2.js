"use strict";
// start of Checkpoint 1
const contentDiv = document.getElementById("content");
if (contentDiv !== null) {
    let elements1 = [];
    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.value = "https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt";
    elements1.push(inputBox);
    const goButton = document.createElement("input");
    goButton.setAttribute("type", "button");
    goButton.value = "Go!";
    elements1.push(goButton);
    contentDiv.replaceChildren(...elements1);
    goButton.addEventListener('click', () => {
        if (inputBox.value !== '') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', inputBox.value, true);
            xhr.send();
            xhr.onload = () => {
                let words = xhr.responseText.split("\n");
                const randomIndex = Math.floor(Math.random() * words.length);
                const toGuess = words[randomIndex];
                console.log(toGuess);
                // end of Checkpoint 1
                // start of Checkpoint 2
                let elements2 = [];
                const guessBox = document.createElement("input");
                guessBox.setAttribute("type", "text");
                elements2.push(guessBox);
                const Alphabet = document.createElement("p");
                Alphabet.textContent = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
                elements2.push(Alphabet);
                contentDiv.replaceChildren(...elements2);
                let guessesLeft = 6;
                guessBox.addEventListener('keypress', (k) => {
                    if (k.key === 'Enter') {
                        if (guessBox.value.length !== 5) {
                            alert("Guess should have exactly 5 characters");
                        }
                        else {
                            const recentGuess = guessBox.value;
                            guessBox.value = "";
                            const guessed = document.createElement("p");
                            guessed.textContent = recentGuess;
                            let newGuessed = [];
                            let guessedArr = guessed.textContent.split("");
                            let toGuessArr = toGuess.split("");
                            for (let g = 0; g < 5; g++) {
                                if (guessedArr[g] == toGuessArr[g]) {
                                    const letter = document.createElement("span");
                                    letter.classList.add("correct");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                                else if (toGuess.indexOf(guessedArr[g]) !== -1) {
                                    const letter = document.createElement("span");
                                    letter.classList.add("misplaced");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                                else {
                                    const letter = document.createElement("span");
                                    letter.classList.add("incorrect");
                                    letter.textContent = guessedArr[g];
                                    newGuessed.push(letter);
                                }
                            }
                            elements2.push(...newGuessed);
                            elements2.push(document.createElement("br"));
                            contentDiv.replaceChildren(...elements2);
                            if (recentGuess === toGuess) {
                                alert("Player guessed correctly!");
                                guessBox.disabled = true;
                            }
                            else if (guessesLeft === 0) {
                                alert("Game over!");
                                guessBox.disabled = true;
                            }
                            else {
                                guessesLeft--;
                            }
                        }
                    }
                });
            };
        }
        else {
            alert("No URL was specified");
        }
    });
}
