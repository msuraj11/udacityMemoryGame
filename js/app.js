/*
 * Created a list that holds all cards
 * initialization of all parameters
 */
let cards = document.getElementsByClassName("card");

let modal = document.getElementById("modal");

let allCards = [...cards];

let openCards = [];

let counter = 0;

let deck = document.getElementById("deckList");

let moves = document.querySelector(".moves");

let clock = document.querySelector(".clock");

let timer;

let seconds = 0;

let hours = 0;

let minutes = 0;

const stars = [...document.getElementsByClassName("fa-star")];

let cardMatched = 0;

let totalMoves = document.querySelector("#totalMoves");

let totalTime = document.querySelector("#totalTime");

let starRating = document.querySelector("#starRating");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// @description disables/Don't allow to click on cards
// @param {}
// @returns void
const disableAllCards = () => {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.add('disabled');
    }
};

// @description enables/allow to click on cards
// @param {}
// @returns void
const enableAllCards = () => {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('disabled');
    }
};

// @description counts number of moves, time & decides stars
// @param {}
// @returns void
const count = () => {
    moves.innerHTML = ++counter;
    if (counter === 1) {
        timer = setInterval(() => {
            //moved clock.innerHTML @ the end of setInterval to remove 1 second delay
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds=0;
            }
            if (minutes === 60) {
                hours++;
                minutes=0;
            }
            if ((counter > 8 && counter <= 16) || ((minutes*60 + seconds > 60 ) && (minutes*60 + seconds <= 90))) {
                for(let i = 0; i < 3; i++){
                    if(i > 1){
                        stars[i].style.color = "black";
                    }
                }
            } else if (counter > 16 || (minutes*60 + seconds > 90 )){
                for(let i = 0; i < 3; i++){
                    if(i > 0){
                        stars[i].style.color = "black";
                    }
                }
            }
            clock.innerHTML = hours ? hours+ "hour(s)" +minutes+" minutes "+seconds+" seconds " : 
                                        minutes+" minutes "+seconds+" seconds " ;
        },1000);
    }
    
};

// @description resets cards, classList, timer, counter, modal
// @param {}
// @returns void
const reset = () => {
    modal.style.display = "none";
    openCards = [];
    counter = 0;
    moves.innerHTML = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    clock.innerHTML = "0 minutes 0 seconds";
    clearInterval(timer);
    cardMatched = 0;
    allCards = shuffle(allCards);
    for (let i = 0; i < allCards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(allCards, (item) => {
            deck.appendChild(item);
        });
        allCards[i].classList.remove('open', 'show', 'match', 'disabled');
    }
    stars.forEach(star => {
        star.style.color = "#9cca1c";
    });
};


//@description: resets everything on page-load/reload
document.onload = reset();

//@description: loops through all cards and adds onclick event-listener, enables counter & time, check matched-cards
allCards.forEach(card => {
    card.addEventListener('click', () => {
        openCards.push(card);
        //@description: To open the card & 'disabled' is to make sure card is not clicked double times.
        card.classList.add('open', 'show', 'disabled');
        if (openCards.length === 2) {
            count();
            //@description: Not allowing other cards to be clicked when we click 2-cards
            disableAllCards();
             if (openCards[0].type === openCards[1].type) {
                openCards[0].classList.add('match');
                openCards[1].classList.add('match');
                cardMatched++;
                //@description: Making openCards Array to empty for reusing it
                openCards=[];
                //@description: Allowing to click if cards matched
                enableAllCards();
            } else {
                //@description: Added color effect if mismatch occurs
                openCards.forEach(item => {
                    item.classList.add('unmatch');
                });
                //@description: Disappear the mismatch color & card after 1 second
                setTimeout(() => {
                    openCards.forEach(item => {
                        item.classList.remove('open', 'show', 'disabled', 'unmatch');
                    });
                    openCards=[];
                    //@description: Allowing to click after cards mismatched
                    enableAllCards();
                },1000);  
            }
        }
        //@description: if all cards matched then show popup
        if (cardMatched === 8) {
            modal.style.display = "block";
            totalMoves.innerHTML = counter;
            totalTime.innerHTML = clock.innerHTML;
            clearInterval(timer);
            starRating.innerHTML = document.querySelector(".stars").innerHTML;
        }
    });
});

