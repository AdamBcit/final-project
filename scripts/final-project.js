// get Elements
const popup          = document.getElementById('popup');    
const playAgain      = document.getElementById("play-again");
const homerImage     = document.getElementById("homer");
const finalImage     = document.getElementById("final-image");
const keyboard       = document.getElementById("keyboard");
const hintText       = document.getElementById("hint");
const wordText       = document.getElementById("word");
const guessText      = document.getElementById("guesses");
const correctText    = document.getElementById("correct-word");

// Variables
let animationHandler;
const fadeDelay      = 10;
let opacity          = 0;
const opacityMax     = 100;
const opacityMin     = 0;
let currentWord;
let wrongGuess       = 0;
const maxGuess       = 6;
let letterCount      = 0;
const homerImageSrc  = "images/Homer";
const pngSrc         = ".png";
const letters        = "abcdefghijklmnopqrstuvwxyz";

// Object
const GameOver = {
    winImage: "images/the-simpsons-suicide.gif",
    win: function(){
        finalImage.src = `${this.winImage}`;
        correctText.innerText = "You Win!!";
        requestAnimationFrame(gameOverPopup);
    },
    lose: function(){
        finalImage.src = `${homerImageSrc}${wrongGuess}${pngSrc}`;
        correctText.innerHTML = `The correct word was: <b>${currentWord}</b>`;
        requestAnimationFrame(gameOverPopup);
    }
}

function reset() {
    // reset word and hint
    const { word, hint } = words[Math.floor(Math.random() * words.length)];
    currentWord = word;
    letterCount = 0;
    hintText.querySelector("b").innerText = hint;
    // reset guess text and image
    wrongGuess = 0;
    homerImage.src = `${homerImageSrc}${wrongGuess}${pngSrc}`;
    guessText.querySelector("b").innerHTML = `${wrongGuess} / ${maxGuess}`;
    // reset word text
    wordText.replaceChildren();
    for (let i = 0; i < word.length; i++) {
        wordText.innerHTML += `<li class="letter"></li>`;
    }
    // reset keyboard
    keyboard.replaceChildren();
    for (let i = 0; i < letters.length; i++) {
        const button = document.createElement("button");
        button.innerText = letters[i];
        keyboard.appendChild(button);
        button.addEventListener("click", event => checkLetter(event.target, letters[i]));
    }
}

const checkLetter = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        for(let i = 0; i < currentWord.length; i++){
            if(currentWord[i] === clickedLetter) {
                letterCount++;
                wordText.querySelectorAll("li")[i].innerText = currentWord[i];
                wordText.querySelectorAll("li")[i].classList.add("guessed");
            }
        }
    } 
    else {
        wrongGuess++;
        homerImage.src = `${homerImageSrc}${wrongGuess}${pngSrc}`;
    }
    button.disabled = true;
    guessText.querySelector("b").innerHTML = `${wrongGuess} / ${maxGuess}`;

    if (wrongGuess == maxGuess) {
        GameOver.lose()
    }
    if (letterCount == currentWord.length){
        GameOver.win()
    }
}

reset();

// Event Listeners
playAgain.addEventListener('click', function (){
    reset();
    let fadeOut = setInterval(function(){
        opacity--;
        popup.style.opacity = `${opacity}%`
        if (opacity <= opacityMin){
            popup.style.display = "none";
            clearInterval(fadeOut);
        }
    }, fadeDelay);
});

// Popup
popup.style.display = "none";
popup.style.opacity = `${opacity}%`

function gameOverPopup() {
    popup.style.display = "block";
    opacity++;
    popup.style.opacity = `${opacity}%`
    if (opacity >= opacityMax) {  
        cancelAnimationFrame(animationHandler);
    } else {
        animationHandler = requestAnimationFrame(gameOverPopup);
    }
}
