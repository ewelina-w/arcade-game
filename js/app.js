// Create enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = Math.random()*300;
  }

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    if (this.x>=500) {
      this.x =- 100;
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Create the player
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
}

// A function to check player's position
Player.prototype.update = function() {
  //Check if the player gets to the water
  player.checkFinish();
  //Check collision with enemies
  if (player.y === enemy6.y && enemy6.x >= (player.x - 85.5) && enemy6.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }
  else if (player.y === enemy5.y && enemy5.x >= (player.x - 85.5) && enemy5.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }
  else if (player.y === enemy4.y && enemy4.x >= (player.x - 85.5) && enemy4.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }
  else if (player.y === enemy3.y && enemy3.x >= (player.x - 85.5) && enemy3.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }
  else if (player.y === enemy2.y && enemy2.x >= (player.x - 85.5) && enemy2.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }
  else if (player.y === enemy1.y && enemy1.x >= (player.x - 85.5) && enemy1.x <= (player.x + 85.5)) {
    player.x = 200;
    player.y = 400;
  }

  //Check if the player gets to the teleporter
  else if (player.x === selector.x && (player.y - selector.y) === 23) {
    player.x = 200;
    player.y = -15;
  }
}

//Draw the player on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Create the teleporter
var Select = function() {
    this.sprite = 'images/Selector.png';
    var arrayX = [-2, 99, 200, 301, 402];
    var selectX = Math.floor(Math.random() * arrayX.length);
    this.x = arrayX[selectX];
    var arrayY = [45, 128, 211, 294, 377];
    var selectY = Math.floor(Math.random() * arrayY.length);
    this.y = arrayY[selectY];
  }

//Draw the teleporter on the canvas
Select.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  //and make it disappear
      selector.selectorDisappear();
    }

//Place the enemy object in a variables
const enemy1 = new Enemy(68);
const enemy2 = new Enemy(151);
const enemy3 = new Enemy(234);
const enemy4 = new Enemy(317);
const enemy5 = new Enemy(151);
const enemy6 = new Enemy(317);

//Place the teleporter object in a variable
const selector = new Select();

//Make the teleporter disappear
selector.selectorDisappear = function () {
  if (moves===4 || player.y===-15) {
    selector.x=-999;
    selector.y=-999;
  }
}

//Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

//Place the player object in a variable
const player = new Player();

// Manage the player moves
let moves = 0;
player.handleInput = function(direction) {
  if (direction==='up' && this.y>=0) {
    this.y-=83;
  } else if (direction==='down' && this.y<=350) {
    this.y+=83;
  } else if  (direction==='right' && this.x<=350) {
    this.x+=101;
  } else if(direction==='left' && this.x>=0) {
    this.x-=101;
  }

  //Count moves
  moves+=1;
}

//Add elements of pop-up which finish the game
const newDiv = document.createElement('div');
const body = document.querySelector('body');
body.appendChild(newDiv);
const div = document.querySelector('div');
const newParagraph = document.createElement('p');
div.appendChild(newParagraph);
const newButton = document.createElement('button');
div.appendChild(newButton);

//Finish the game when the player gets to water
player.checkFinish = function() {
  if(player.y===-15) {
    document.querySelector('div').style.display='block';
    newParagraph.innerText=`Congratulations! You won with ${moves} moves`;
    newButton.innerText=`Play again`;
    document.removeEventListener('keyup', keys);
  }
}

//Listen for key presses and sends the keys to your
function keys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keys);

//Add event listener to play again button
newButton.addEventListener('click', function() {
  player.x=200;
  player.y=400;
  moves = 0;
  document.addEventListener('keyup', keys);
  document.querySelector('div').style.display='none';
  }
)
