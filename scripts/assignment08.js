// get Elements
const popup          = document.getElementById('popup');    
const closeButton    = document.getElementById("close-button");
const startButton    = document.getElementById("start-button");
const stopButton     = document.getElementById("stop-button");
const reverseButton  = document.getElementById("reverse-button");
const bikeImage      = document.getElementById("bike-image");

// Variables popup
const fadeDelay      = 10;   // 10 * 100(opacityMax) = 1000 = 1 second
const popupDelay     = 3000;
let popupTimer;              // popup setTimeout
let opacity          = 0;
const opacityMax     = 100;
const opacityMin     = 0;

// Variables bike
let bikeRotate       = false;
let reverseRotate    = false;
const bikeImageSrc   = "images/product-images/bike-";
const jpgSrc         = ".jpg";
let bikeNumber       = 1;
const bikeMax        = 34;
const bikeMin        = 1;
let bikeAnimation;           // bike requestAnimationFrame
let bikeTimeOut;             // bike setTimeout
const animationDelay = 100;

// Event Listeners
closeButton.addEventListener('click', function (){
    let fadeOut = setInterval(function(){
        opacity--;
        popup.style.opacity = `${opacity}%`
        if (opacity <= opacityMin){
            popup.style.display = "none";
            clearInterval(fadeOut);
        }
    }, fadeDelay);
});

startButton.addEventListener('click', function (){
    clearTimeout(popupTimer);
    if (reverseRotate){
        reverseRotate = false;
        clearTimeout(bikeTimeOut);
        cancelAnimationFrame(bikeAnimation);
    }
    if (!bikeRotate) {
        bikeRotate = true;
        bikeAnimation = requestAnimationFrame(rotateBike);
    }
});

stopButton.addEventListener('click', function (){
    bikeRotate = false;
    reverseRotate = false;
    clearTimeout(bikeTimeOut);
    cancelAnimationFrame(bikeAnimation);
});

reverseButton.addEventListener('click', function (){
    clearTimeout(popupTimer);
    if (bikeRotate){
        bikeRotate = false;
        clearTimeout(bikeTimeOut);
        cancelAnimationFrame(bikeAnimation);
    }
    if (!reverseRotate) {
        reverseRotate = true;
        bikeAnimation = requestAnimationFrame(reverseRotateBike);
    }
});

// Popup
popup.style.display = "none";
popup.style.opacity = `${opacity}%`

popupTimer = setTimeout( function(){
    popup.style.display = "block";
    let fadeIn = setInterval(function(){
        opacity++;
        popup.style.opacity = `${opacity}%`
        if (opacity >= opacityMax){
            clearInterval(fadeIn);
        }
    }, fadeDelay);
}, popupDelay);

// Bike functions
function rotateBike() {
    bikeTimeOut = setTimeout( function(){
        bikeNumber++;
        if (bikeNumber > bikeMax){
            bikeNumber = bikeMin;
        }
        bikeImage.src = `${bikeImageSrc}${bikeNumber}${jpgSrc}`;
        bikeAnimation = requestAnimationFrame(rotateBike);
    }, animationDelay);
}

function reverseRotateBike() {
    bikeTimeOut = setTimeout( function(){
        bikeNumber--;
        if (bikeNumber < bikeMin){
            bikeNumber = bikeMax;
        }
        bikeImage.src = `${bikeImageSrc}${bikeNumber}${jpgSrc}`;
        bikeAnimation = requestAnimationFrame(reverseRotateBike);
    }, animationDelay);
}
