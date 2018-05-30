let row = [51, 132, 213, 294, 375, 456];
let column = [0, 101, 202, 303, 404];
let bugrow = [0, 101, 202, 303, 404];
let bugcolumn = [51, 132, 213];
let lives = 3;
let dead = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//enemy class function
class Enemy {
    // Variables applied to each of our instances go here,
    constructor() {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(getRandomInt(0,404));
    this.y = bugcolumn[Math.floor(Math.random()*bugcolumn.length)];
    this.w = 101;
    this.h = 171;
    this.leftLimit = this.x - 50.5;
    this.rightLimit = this.x + 50.5;
    this.speed = getRandomInt(75,250);
  }
//random selection of bugs column
bugc() {
    return bugcolumn[Math.floor(Math.random()*bugcolumn.length)];
}
//random selection of bugs row
bugr() {
    return bugrow[Math.floor(Math.random()*bugrow.length)];
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
    // Any movement multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -101;
      this.y =  this.bugc();
     }
     this.leftLimit = Math.floor(this.x - 30.5);
     this.rightLimit = Math.floor(this.x + 30.5);
     this.upperLimit = Math.floor(this.y + 30.5);
     this.lowerLimit = Math.floor(this.y - 30.5);
   }
   // Draw the enemy on the screen, required method for game
   render() {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }
}

// This player class requires an update(), render() and a handleInput() method
class Player {
constructor() {
  this.reset();
  this.sprite = 'images/char-boy.png';
  //this.sprite = 'images/' + hero + '.png';
}

//reset play, called later durring certain conditions
reset() {
  this.column = 2;
  this.row = 4;
  this.x = column[this.column];
  this.y = row[this.row];
}

update(dt) {
  //this.checkCollision(this.leftLimit, this.rightLimit);
  this.leftLimit = this.x - 30.5;
  this.rightLimit = this.x + 30.5;
  this.upperLimit = this.y;
  this.lowerLimit = this.y;

  var interval = setInterval(this.checkCollision(this.leftLimit, this.rightLimit), 1000);
  setTimeout(function() {
      clearInterval(interval);
  }, 2000);

}



render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//handles key input
handleInput(keypress) {
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

}


checkCollision(playerl,playerr) {
  //check collision for each bug
  for (var i = 0; i < 5; i++) {
        var thisEnemy = allEnemies[i];
        if (
            thisEnemy.leftLimit < player.rightLimit &&
            thisEnemy.rightLimit > player.leftLimit &&
            thisEnemy.upperLimit > player.lowerLimit &&
            thisEnemy.lowerLimit < player.upperLimit &&
            dead==false) {

            console.log("collision");
            dead=true; // dying is true, so we wont end up in this block again
            setTimeout(function(){
                dead=false; //after 500 milliseconds we set dying to false so our player has the ability to die again!
            },500);
            player.loseLife();
       }
    }
}

loseLife() {
  this.reset;
  if (lives >0) {
  lives -= 1;
  $(".lives").text(lives);
  //if dead, reset, and and if no lives left reset
}
    if (lives === 0) {
    diedmessage();
    //if no lives left show losing message
  }
}

}

//stops activity, called later for winning or losing
function stop() {
  for (var i = 0; i < 5; i++) {
    var thisEnemy = allEnemies[i];
    thisEnemy.speed=0;}
}

//countdown timer
var seconds = 60;
var incrementSeconds = setInterval(function(){
  if (seconds >0 && player.y < 294 && player.y > 50){
    seconds--;
    $(".time").text(seconds);
    if (lives===0){clearInterval(incrementSeconds);}
  }
  if (seconds===0) {timemessage();}
}, 1000);

//message for if you lost too many lives and lost
function diedmessage() {
    stop();
    document.getElementById('loseModal').style.display='block';
    document.querySelector('.modal-title').innerText='You lost!';
    document.querySelector('.modal-body').innerText='You died too many times, try again.';
    $(loseModal).modal('show');
}
//message for winning if you did not die by the timer ran out
function timemessage() {
    stop();
    document.getElementById('loseModal').style.display='block';
    document.querySelector('.modal-title').innerText='Congradulations!';
    document.querySelector('.modal-body').innerText='You won! Play again.';
    $(loseModal).modal('show');
}

// objects instantiated
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4, bug5];
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
