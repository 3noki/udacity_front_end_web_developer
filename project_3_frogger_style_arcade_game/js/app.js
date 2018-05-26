row = [51, 132, 213, 294, 375];
column = [0, 101, 202, 303, 404];


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x = x;
    // this.y = y;
    // this.speed = speed;
    this.x += this.speed * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.reset();
  this.lives = 3;
};

Player.prototype.catgirl = function() {
  this.sprite = 'images/char-cat-girl.png';
}
Player.prototype.horngirl = function () {
  this.sprite = 'images/char-horn-girl.png';
}


Player.prototype.reset = function() {
  this.column = 2;
  this.row = 4  ;
  this.x = column[this.column];
  this.y = row[this.row];
}

Player.prototype.update = function(dt) {

  //this.x += this.speed * dt;

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
    if (keypress === 'up' && this.y > 51) {
      this.y -= 101;
    }
    if (keypress === 'down' && this.y < 375) {
      this.y += 101;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(303, 101, 101);

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