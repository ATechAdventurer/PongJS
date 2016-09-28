var ball;
var players = [];
var p1;
var p2;
function setup() {
  createCanvas(800,600);
  background(0);
  players.push(new Player(0));
  players.push(new Player(1));
  ball = new Ball();
  p1 = players[0];
  p2 = players[1];
}

function draw() {
  background(0);
  text("Player 1: "+p1.points +" \nPlayer 2: "+ p2.points,10,20);

  if(ball.pos.x > width){
    ball = new Ball();
    players[1].addPoint();
  }
  if(ball.pos.x < 0){
    ball = new Ball();
    players[0].addPoint();
  }
  ball.checkCollision(players[0],players[1]);
  ball.move();
  ball.draw();
  if(keyIsDown(UP_ARROW)){
    players[1].up();
  }
  if(keyIsDown(DOWN_ARROW)){
    players[1].down();
  }
  if(keyIsDown(87)){
    players[0].up();
  }
  if(keyIsDown(83)){
    players[0].down();
  }
  for(var i = 0; i < players.length; i++){
    players[i].draw();
  }
  
}

var Ball = function(){
  var dir = [-1,1];
  var speeds = [-4,4];
  this.pos = createVector(width/2.0,height/2.0);
  this.colr = color(255);
  this.speed = createVector(speeds[round(random(0,1))],0);
  this.direction = dir[random(0,1)];
  this.draw = function(){
    rect(this.pos.x,this.pos.y,10,10);
  };
  this.move = function(){
    if(this.pos.y > height || this.pos.y < 0){
      this.speed.y *= -1;
    }
    this.pos.add(this.speed);
  };
  this.checkCollision = function(p1,p2){
    if(collideRectRect(this.pos.x,this.pos.y,10,10,p2.pos.x,p2.pos.y,p2.size.x,p2.size.y) || collideRectRect(this.pos.x,this.pos.y,10,10,p1.pos.x,p1.pos.y,p1.size.x,p1.size.y)){
      this.speed.x *= -1.2;
      this.speed.y = random(-2,2);
    }
  };
};

var Player = function(id){
  this.id = id;
  this.points = 0;
  if(this.id === 0){
    this.pos = createVector(30,height/2.0);
  }else{
    this.pos = createVector(width-40,height/2.0);
  }
  this.colr = color(255);
  this.speed = createVector(0,5.5);
  this.size = createVector(10,60);
  this.draw = function(){
    fill(this.colr);
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
  };
  this.up = function(){
    this.pos.sub(this.speed);
  };
  this.down = function(){
    this.pos.add(this.speed);
  };
  this.addPoint = function(){
    this.points++;
    console.log(this.points);
  };
};