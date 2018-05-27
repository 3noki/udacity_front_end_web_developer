row = [51, 132, 213, 294, 375, 456];
column = [0, 101, 202, 303, 404];

bugrow = [0, 101, 202, 303, 404];
bugcolumn = [51, 132, 213];
var result = [51, 132, 213][Math.floor(Math.random() * 3)]

//lives = $(".lives");
score = $(".score");

var bugr = bugrow[Math.floor(Math.random()*bugrow.length)];
var bugc = bugcolumn[Math.floor(Math.random()*bugcolumn.length)];
var newbugc = bugcolumn[Math.floor(Math.random()*bugcolumn.length)];

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}
var myRandomElement = bugcolumn.randomElement()

var random = (Math.floor(Math.random() * .3) * 13) + 101;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 313;
    this.y = result;
    this.speed = random;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -101 - (Math.floor(Math.random()*10)*10+1);
      this.y = bugc;
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
  //this.lives = "3";
  this.sprite = 'images/char-boy.png';
  //this.sprite = 'images/' + hero + '.png';
}

Player.prototype.reset = function() {
  this.column = 2;
  this.row = 4;
  this.x = column[this.column];
  this.y = row[this.row];
}

Player.prototype.update = function(dt) {

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
    message();
    //console.log("if no lives left show losing message")
  }
};

function message() {
    document.getElementById('loseModal').style.display='block'
    $(loseModal).modal('show');
}

function newGame() {
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var enemyNum = 5;

var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];
// var allEnemies = [];
// for (var i = 0; i < enemyNum; i++) {
//     allEnemies.push(new Enemy());
// };
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
