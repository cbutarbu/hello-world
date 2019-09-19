/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');
  var piece;
    var ctx;
    var alien;
    var aliens = [];
    var restart = false;
    var state = 0;
    var spot;
    var score;
    var time;

    var msg;
    
    var level = 1;
    var point = 0;
    var record;
    var nice;
    var music = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Fspace%20music%20yea.mp3?1548010469303";
    var um = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Foh.mp3?1548005221880";
    var up = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Fuprocket.png?1547958411256";
    var down = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Fdownrocket.png?1547958423236";
    var left = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Fleftrocket.png?1547958437059";
    var right = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Frightrocket.png?1547958447758";
    var alienpic = "https://cdn.glitch.com/b981739d-18d6-40ae-bfe3-88bacefb5fef%2Fsad%20alien%20boi.png?1547958980814";

    
  var spaceMusic = new sound(music);   
 var ohno= new sound(um);
  var started = false;

function startGame(){
 spaceMusic.play();
 spaceMusic.loop = true;

 piece = new component(30,30, up, 100, 100,"image", 5); 
 alien = new component(30,30, alienpic, Math.random()*(750) + 30,  Math.random()*(350) + 30,"image", 15);
 time = new component("30px", "Consolas", "white", 450, 40, "text", 0);
 score = new component("30px", "Consolas", "white", 100, 40, "text", 0);
 spot = new component("30px", "Consolas", "white", 450, 40, "text", 0);
   
  if (started == false) {
     gameArea.start();
  }
  
  started = true;
  gameArea.frameNo=0;
}



var gameArea = {
  canvas : document.createElement("canvas"),
  
  // Start
  start : function() {
    this.canvas.width = 800;
    this.canvas.height = 450;
    this.context = this.canvas.getContext("2d");   
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    window.addEventListener('keydown', function (e) {
            e.preventDefault();
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown"); })
    
    window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");})
  },
   
  // Stop
  stop : function() {
        clearInterval(this.interval);
   },    
  
  // Clear
  clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }
}


function component(width, height, color, x, y, type, speed){
  this.type = type;
  if(type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  
  this.x= x;
  this.y= y;
  this.width= width;
  this.height= height;
  this.direction = 1;
  this.speed = speed;
  this.angle = 0;
  this.moveAngle = 0;
   this.update = function() {
   ctx = gameArea.context;
   ctx.save();
     
   if (this.type == "image") {
     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
   } else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    
   } else {
     ctx.fillStyle = color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
   }
   //var hitbox = ctx.strokeRect( this.x, this.y, this.width - 5, this.height - 2);
   //hitbox.style.visibility = "hidden";   
  ctx.translate(this.x, this.y);
   ctx.rotate(this.angle);
   ctx.restore();
  }
  
  this.newPos = function() {
    this.angle = this.moveAngle * Math.PI / 180;
    this.y -= this.speed * Math.cos(this.angle);
    this.x += this.speed * Math.sin(this.angle);
  }
  
  
  this.crashWith = function(otherobj) {
    
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }  
}
    

function stopped() {
   
  if(gameArea.keys && gameArea.keys[32]) {
    state = 0;
    spaceMusic.stop();
    gameArea.clear();
  
   if (nice) {
    point++;
   } else {
    point = 0;
   }
    
   nice = false;
 
   record = 11 - (gameArea.frameNo / 53);
   aha = Math.floor(record);
   startGame();
  }
}
 
    var aha;
function updateGameArea() {
  if (piece.crashWith(alien)) {
    time.text = "TIME: " + Math.floor(record);
    //ohno.play();
    nice = true;
   
    msg = new component("30px", "Consolas", "white", 175, 250, "text", 0);
    msg.text = "NICE - press space to cont.";
    msg.update();
    state = 1;
    stopped();
    
  } else if ( aha == 0 ) {
    msg = new component("30px", "Consolas", "white", 100, 250, "text", 0);
    msg.text = "GAME OVER - press space to go again";
    msg.update();
    state = 1;
    stopped(); 
    
  } else {
    
    if (state == 0 ) {  
      gameArea.clear(); 
      gameArea.frameNo++;
      piece.moveAngle = 0;
      
      
      record = 11 - (gameArea.frameNo / 53);
      aha = Math.floor(record);
      
      time.text = "TIME: " + Math.floor(record);
      time.update();
      
      alien.update(); 
      piece.update();
    }
    score.text = "SCORE: " + point;
      score.update(); alien.update(); 
      piece.update();
  
    /*
    var xbound = 800 - alien.width*(1.5);
    var ybound = 650 -alien.width*(1.5);
    var limitx = (xbound - alien.speed - alien.x - Math.random()*(50)) ;
    var limity = (ybound - alien.speed - alien.y- Math.random()*(50)) ;
    
    
    if ( alien.speed > 0) {
    if (alien.x < xbound) {
      alien.x += alien.speed + Math.random()*(limitx);
    } else {
      alien.speed = -alien.speed;
      alien.x += alien.speed + Math.random()*(limitx);
    }  
    if (alien.y < ybound) {
      alien.y += alien.speed +  Math.random()*(limity);
    } else {
      alien.speed = -alien.speed;
      alien.y += alien.speed +  Math.random()*(limity);
    }  
    

  } else {
    var xbound2 = alien.width / 2 - alien.speed;
    var ybound2 = alien.height / 2 - alien.speed;
    var limitx2 = (xbound2 - alien.speed - alien.x - Math.random()*(50)) ;
    var limity2 = (ybound2  - alien.speed - alien.y - Math.random()*(50));
    
    
    if ( alien.x > xbound2 ) {
        
      alien.x += alien.speed + Math.random()*(limitx2);
    } else {
      alien.speed = -alien.speed;
      alien.x += alien.speed + Math.random()*(limitx2);
    }
     if ( alien.y >  ybound2 ) {
      alien.y += alien.speed + Math.random()*(limity2);
    } else {
      alien.speed = -alien.speed;
      alien.y += alien.speed + Math.random()*(limity2);
    }
  }
    
      
    */

  
  // Left
  if(gameArea.keys && gameArea.keys[37]) {
    if (piece.x > piece.width / 2) {
      piece.image.src = left;
      piece.x -= piece.speed; 
      piece.direction = 4;
    }
  }
  
  // Right
  if(gameArea.keys && gameArea.keys[39]) {
    if (piece.x < 800 - piece.width*(1.5) ) {
      piece.image.src = right;
      piece.x += piece.speed; 
      piece.direction = 2;
    }
  }
  
  // Up
  if(gameArea.keys && gameArea.keys[38]) {
    if (piece.y > piece.height / 2) {
      piece.image.src = up;
      piece.y -= piece.speed;
      piece.direction = 1;
    }
  }
  
  // Down
  if(gameArea.keys && gameArea.keys[40]) {
    if (piece.y < 450 - piece.height*(1.5) ) { 
      piece.image.src = down;
      piece.y += piece.speed;
      piece.direction = 3;
    }
  }


    /*gameArea.frameNo += 1;
  if (gameArea.frameNo == 1 || everyInterval(150)) {
    x = 50;
    y = 50;
    aliens = new component(30, 30, "green", x, y, "rectangle"));
  }*/
  
/* for(int i = 0; i < aliens.length; i++) {
    aliens[i].y += aliens[i].speed;
    aliens[i].update();
  }*/
  }
}
  
 function sound(src) {
   
   this.sound = document.createElement("audio");
   this.sound.src = src;
   this.sound.setAttribute("preload", "auto");
   this.sound.setAttribute("controls", "none");
   this.sound.style.display = "none";
   document.body.appendChild(this.sound);
   
   this.play = function(){
     this.sound.play();
   }
   this.stop = function(){
     this.sound.pause();
   }
 }



 function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}