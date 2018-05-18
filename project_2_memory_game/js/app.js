/* declaring variables*/

//list of cards
let cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor",  "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

restart = $(".restart");
moves = $(".moves");
timer = $(".timer");
cards = $(".card");
deck = document.getElementsByClassName('deck');
card = document.querySelectorAll('card');

let openedCardsList = [];
let matchedCards = [];
let matched =0;
let seconds = 0;
let clicks = 0;
let time = setInterval(incrementSeconds, 1000);


/* declaring functions*/
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/* initialize the game */
function init() {
    let shuffledCards = shuffle(cardsList);
    openedCardsList = [];
    createCardHTML();
    incrementSeconds();
  }

/*restart a game*/
function newGame() {history.go(0);}

/*create the html content for the cards*/
function createCardHTML() {
  symbol = cards.children("i");
  symbol.each(function(index, item) {
    $(item).addClass(cardsList[index])
      .data('fa', cardsList[index].substring(3));
  });
  return symbol;
}

//open the card on a click and push it to an array to track, if it's two check if there's a match6
$(".card").on("click", function cardFlip() {
  if (!this.classList.contains('open') && openedCardsList.length < 2) {
    this.classList.toggle('open');
    this.classList.toggle('show');

    $(".card").click( function(event) {
      event.preventDefault();
    })


    openedCardsList.push(this);
    if (openedCardsList.length == 2){
          checkForMatch()
      } else {}

  }
  else { checkForMatch();}
});

//check if the cards selected/clicked are a match, if not revert back to original state
function checkForMatch() {
  if (openedCardsList.length ===2) {
    var b = $('i.fa', openedCardsList[0]).data('fa');
    var c = $('i.fa', openedCardsList[1]).data('fa');
    var eq = ( b && c && b === c );
    if (eq) {
      $(openedCardsList[0]).removeClass('open').addClass('match');
      $(openedCardsList[1]).toggleClass('open match');
      openedCardsList = [];
      matched++;
      //console.log(matched);
    }else {unFlip();}
  } else {console.log("no match");}
}

//function to revert the card state back to original
function unFlip() {
  setTimeout(function(){
  openedCardsList[0].classList.toggle('open');
  openedCardsList[0].classList.toggle('show');
  openedCardsList[1].classList.toggle('open');
  openedCardsList[1].classList.toggle('show');
  openedCardsList = [];
  },700);
}

//counts clicks and edits text
$(".card").on("click", clickCounter);
function clickCounter() {
   if (matched != 8) {
    clicks++;
    moves.text(clicks);
    reduceStars();
  } else { gameWin(); };
 //console.log(clicks);
};

//counts seconds and displays
seconds = 0;
function incrementSeconds() {
  let time = null;
  if (matched != 8 )  {
    //seconds += 1;
    seconds++;
    timer.text(seconds);
    let time = seconds;
    return seconds;
}
//stop timer if game is over
  else {gameWin();}
}
//reduces stars per certain # of clicks reached, if a limit is reached game is over
let stars =3;
function reduceStars() {
  if (clicks <=16) {}
  else if (clicks > 16 && clicks <= 32){
    var item = document.getElementById("1st-star");
    item.parentNode.removeChild(item);
    stars--;
  }
  else if (clicks > 32 && clicks <=64) {
    var item = document.getElementById("2nd-star");
    item.parentNode.removeChild(item);
    stars--;
  }
  else {
    gameLose();
    return stars;
  }
}

function gameLose() {
    //let loseModal =
    document.getElementById('loseModal').style.display='block'
    $(loseModal).modal('show');
}

function gameWin() {
    let winModal = document.getElementById('winModal');
    $(winModal).modal('show');
    let winner = document.querySelector('.win');
    winner.innerText="You have won in " + seconds + " seconds with a score of " + stars + " stars";
    console.log(winner);
}

//starts game when page is ready
$(".restart").on("click", newGame);
$(".close").on("click", newGame);
$(".btn").on("click", newGame);
document.addEventListener('DOMContentLoaded', function() {init();});
