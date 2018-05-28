row = [51, 132, 213, 294, 375, 456];
column = [0, 101, 202, 303, 404];

score = $(".score");

bugrow = [0, 101, 202, 303, 404];
bugcolumn = [51, 132, 213];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(getRandomInt(0,404));
    this.y = bugcolumn[Math.floor(Math.random()*bugcolumn.length)];
    this.w = 101;
    this.h = 171;
    this.leftLimit = this.x - 50.5;
    this.rightLimit = this.x + 50.5;
    this.speed = getRandomInt(75,250);
};

Enemy.prototype.bugc = function () {
    return bugcolumn[Math.floor(Math.random()*bugcolumn.length)];
}
Enemy.prototype.bugr = function () {
    return bugrow[Math.floor(Math.random()*bugrow.length)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -101;
      this.y =  this.bugc();
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.leftLimit = Math.floor(this.x - 30.5);
    this.rightLimit = Math.floor(this.x + 30.5);
    this.upperLimit = Math.floor(this.y + 30.5);
    this.lowerLimit = Math.floor(this.y - 30.5);
};

class Gem {
  constructor(color) {
  this.sprite = 'images/Gem '+ color +'.png';
  }
}
const greenGem = new Gem("Green");
const blueGem = new Gem("Blue");
const orangeGem = new Gem("Orange");

//randomly spawn gems
//after x time removes gems or stays untill picked up
// after gems are removed, randomply spawn them again
// increment score when gems are picked up
//after x gems are picked up game is won




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// let hero = 'char-boy';
// document.getElementById('boybutton').addEventListener('click', function () {
//     hero = 'char-boy';
// });
//
// document.getElementById('catgirlbutton').addEventListener('click', function () {
//       hero = 'char-cat-girl';
// });
//
// document.getElementById('horngirlbutton').addEventListener('click', function () {
//     hero = 'char-horn-girl';
// });
// document.getElementById('princessgirlbutton').addEventListener('click', function () {
//     hero = 'char-princess-girl';
// });
//
// document.getElementById('pinkgirlbutton').addEventListener('click', function () {
//     hero = 'char-pink-girl';
// });


var Player = function() {
  this.reset();
  this.sprite = 'images/char-boy.png';
  //this.sprite = 'images/' + hero + '.png';
}

Player.prototype.reset = function() {
  this.column = 2;
  this.row = 4;
  this.x = column[this.column];
  this.y = row[this.row];
  this.w = 101;
  this.h = 171;
}

Player.prototype.update = function(dt) {
  checkCollision(this.leftLimit, this.rightLimit);
  this.leftLimit = this.x - 30.5;
  this.rightLimit = this.x + 30.5;
  this.upperLimit = this.y;
  this.lowerLimit = this.y;
};

function checkCollision(playerl,playerr) {
  for (var i = 0; i < 5; i++) {
            var thisEnemy = allEnemies[i];
            if (
               thisEnemy.leftLimit < player.rightLimit &&
               thisEnemy.rightLimit > player.leftLimit &&
               thisEnemy.upperLimit > player.lowerLimit &&
               thisEnemy.lowerLimit < player.upperLimit) {
               console.log("collision");
               //console.log(player.lowerLimit, player.upperLimit, thisEnemy.lowerLimit, thisEnemy.upperLimit)
               player.loseLife();
           }
            else {//console.log('else');
            }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) {
    if (keypress === 'left' && this.x > 0) {
      this.x -= 101;
    }
    if (keypress === 'right' && this.x < 404) {
      this.x += 101;
    }
    if (keypress === 'up' && this.y > 0) {
      this.y -= 81;
    }
    if (keypress === 'down' && this.y < 375) {
      this.y += 81;
    }
    if (keypress === 'up' && this.y < 51) {
      this.loseLife();
    }

};

var lives=3;
Player.prototype.loseLife = function () {
  this.reset()
  if (lives >0) {
  lives -= 1;
  $(".lives").text(lives);
  //console.log("dead, reset, and and if no lives left reset")
}
    if (lives === 0) {
    diedmessage();
    //console.log("if no lives left show losing message")
  }
};

function diedmessage() {
    document.getElementById('loseModal').style.display='block'
    document.querySelector('.modal-title').innerText='You lost!'
    document.querySelector('.modal-body').innerText='You died too many times, try again.'
    $(loseModal).modal('show');
}
function timemessage() {
    document.getElementById('loseModal').style.display='block'
    document.querySelector('.modal-title').innerText='Congradulations!'
    document.querySelector('.modal-body').innerText='You won! Play again.'
    $(loseModal).modal('show');
}

function newGame() {
};


var seconds = 60;
var incrementSeconds = setInterval(function(){
  if (seconds >0){
    seconds--;
    $(".time").text(seconds);
    if (lives===0){
    clearInterval(incrementSeconds);
  } }
  if (seconds===0) {
    timemessage();
  }

}, 1000);

// seconds = 60;
// setInterval(
// function incrementSeconds() {
//   if (lives>0)  {
//     seconds--
//     $(".time").text(seconds);
//     return seconds;
// }
// //stop timer if game is over
//   else {gameWin();}
// }, 1000);

//setInterval(incrementSeconds(),2000);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4, bug5];
//var allEnemies = [bug1];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//document.addEventListener('DOMContentLoaded', function() {incrementSeconds();});
// $(document).ready(function () {
// incrementSeconds()
// });
