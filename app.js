/*
 * Created a list that holds all cards
 */
let cards = document.getElementsByClassName("card");

let allCards = [...cards];

let openCards = [];

let counter = 0;

let deck = document.getElementById("deckList");

let moves = document.querySelector(".moves");

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


const disableAllCards = () => {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.add('disabled');
    }
}

const enableAllCards = () => {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('disabled');
    }
}

// const render = (allCards) => {
//     for (let i = 0; i < allCards.length; i++) {
        
//         allCards[i].addEventListener('click', () => {
//             openCards.push(allCards[i]);
//             //To open the card & 'disabled' is to make sure card is not clicked double times.
//             allCards[i].classList.add('open', 'show', 'disabled');
//             if (openCards.length == 2) {
//                 //Not allowing other cards to be clicked when we click 2-cards
//                 disableAllCards();
//                  if (openCards[0].type === openCards[1].type) {
//                      openCards[0].classList.add('match');
//                      openCards[1].classList.add('match');
//                      //Making openCards Array to empty for reusing it
//                      openCards=[];
//                      //Allowing to click other cards if cards matched
//                      enableAllCards();
//                 } else {
//                     //Added color effect if mismatch occurs
//                     openCards.forEach(item => {
//                         item.classList.add('unmatch');
//                     });
//                     //Disappear the mismatch color & card after 1 second
//                     setTimeout(() => {
//                         openCards.forEach(item => {
//                             item.classList.remove('open', 'show', 'disabled', 'unmatch');
//                         });
//                         openCards=[];
//                         //Allowing to click after cards mismatched
//                         enableAllCards();
//                     },1000);  
//                 }
//             }
//         });
//     }
// }

const count = () => {
    moves.innerHTML = ++counter;
}

const reset = () => {
    openCards = [];
    counter = 0;
    moves.innerHTML = 0;
    allCards = shuffle(allCards);
    for (let i = 0; i < allCards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(allCards, (item) => {
            deck.appendChild(item);
        });
        allCards[i].classList.remove('open', 'show', 'match', 'disabled');
    }
    //render(allCards);
}

document.onload = reset();


allCards.forEach(card => {
    card.addEventListener('click', () => {
        openCards.push(card);
        //To open the card & 'disabled' is to make sure card is not clicked double times.
        card.classList.add('open', 'show', 'disabled');
        if (openCards.length == 2) {
            count();
            //Not allowing other cards to be clicked when we click 2-cards
            disableAllCards();
             if (openCards[0].type === openCards[1].type) {
                 openCards[0].classList.add('match');
                 openCards[1].classList.add('match');
                 //Making openCards Array to empty for reusing it
                 openCards=[];
                 //Allowing to click if cards matched
                 enableAllCards();
            } else {
                //Added color effect if mismatch occurs
                openCards.forEach(item => {
                    item.classList.add('unmatch');
                });
                //Disappear the mismatch color & card after 1 second
                setTimeout(() => {
                    openCards.forEach(item => {
                        item.classList.remove('open', 'show', 'disabled', 'unmatch');
                    });
                    openCards=[];
                    //Allowing to click after cards mismatched
                    enableAllCards();
                },1000);  
            }
        }
    });
});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
