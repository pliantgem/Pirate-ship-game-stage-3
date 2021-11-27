const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;

var balls=[];

//examples on arrays

var arr1 = [1,2,3,4,5];
console.log(arr1);

var arr2 = ["James", 9, "pizza", true];
//index        0     1      2      3
console.log(arr2);

console.log(arr2[0]);

var arr3 = [ [1,2], [3,4], ["mango", "geometry"]];
//index        0      1       2         
console.log(arr3);
console.log(arr3[0][0]);
console.log(arr3[1][1]);

arr2.push("geometry");
console.log(arr2);
arr2.pop();
console.log(arr2);


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();

  for (var i = 0;i<balls.length;i++){
    showCannonBalls(balls[i],i);
  }
  
}

function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}

function showCannonBalls(ball,i){
  if(ball){
    ball.display();
  }
}
