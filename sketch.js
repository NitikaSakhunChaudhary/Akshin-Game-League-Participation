var bg, bgImage, bg2, bg2Image;
var boy, boyImage, thief, thiefImage;
var ground;
var bird, birdImage;
//new
var birdGroup;
var car, carImage, carGroup;
var spikeSet, spikeSetImage, spikeSetGroup;
var wall, wallImage, wallGroup;
var continueButton;
var continueButton2, continueButtonImage;
var score = 0;

var text1 = "CATCH", text2 = "THE THIEF";

var gameState = "startlevel1";
var levelJustChanged = 0;
function preload() {

  bgImage = loadImage("bg.jpg");
  bg2Image = loadImage("bg2.jpg");

  boyImage = loadAnimation("Boy animation 1.png", "Boy animation 10.png", "Boy animation 11.png", "Boy animation 12.png", "Boy animation 13.png", "Boy animation 14.png", "Boy animation 15.png", "Boy animation 16.png", "Boy animation 17.png", "Boy animation 18.png", "Boy animation 19.png", "Boy animation 2.png", "Boy animation 20.png", "Boy animation 3.png", "Boy animation 4.png", "Boy animation 5.png", "Boy animation 6.png", "Boy animation 7.png", "Boy animation 8.png", "Boy animation 9.png");

  thiefImage = loadAnimation("Thief animation 34.png", "Thief animation 33.png", "Thief animation 32.png", "Thief animation 31.png", "Thief animation 30.png", "Thief animation 29.png", "Thief animation 28.png", "Thief animation 27.png", "Thief animation 26.png", "Thief animation 25.png", "Thief animation 24.png", "Thief animation 23.png", "Thief animation 22.png", "Thief animation 21.png", "Thief animation 20.png", "Thief animation 19.png", "Thief animation 18.png", "Thief animation 17.png", "Thief animation 16.png", "Thief animation 15.png", "Thief animation 14.png", "Thief animation 13.png", "Thief animation 12.png", "Thief animation 11.png", "Thief animation 10.png", "Thief animation 9.png", "Thief animation 8.png", "Thief animation 7.png", "Thief animation 6.png", "Thief animation 5.png", "Thief animation 4.png", "Thief animation 3.png", "Thief animation 2.png", "Thief animation 1.png");

  birdImage = loadAnimation("Bird animation 1.png", "Bird animation 2.png", "Bird animation 3.png", "Bird animation 4.png", "Bird animation 5.png", "Bird animation 6.png", "Bird animation 7.png", "Bird animation 8.png");

  carImage = loadImage("car.png");

  spikeSetImage = loadImage("spikes.png");

  continueButtonImage = loadImage("Continue Button.png");
}

function setup() {
  createCanvas(600, 400);

  ground = createSprite(width / 2, height, width, 10);

  bg = createSprite(300, 200);
  bg.addImage("bg", bgImage);
  //new
  bg.addImage("bg2",bg2Image);
  bg.scale = 0.35;
  bg.x = 1500;
  bg.velocityX = -3;

  boy = createSprite(50, 350);
  boy.addAnimation("boy", boyImage);
  boy.scale = 0.6;

  thief = createSprite(500, 360);
  thief.addAnimation("thief", thiefImage);
  thief.scale = 0.85;

  continueButton = createSprite(300, 320);

  continueButton2 = createSprite(300, 270);
  continueButton2.addImage("continueButton", continueButtonImage);
  continueButton2.scale = 0.15;

  wallGroup = new Group();
  spikeSetGroup = new Group();
  carGroup = new Group();
  birdGroup = new Group();
}

function draw() {
  background("white");

  //frameRate(60);

  if (gameState === "startlevel1") {
    background(255, 140, 0);

    fill(255, 140, 0);
    strokeWeight(4);
    stroke("black");
    ellipse(300, 200, 380, 380);

    rect(200, 292, 200, 55);
    textSize(36.5);
    text("CONTINUE", 205, 332);

    strokeWeight(0);
    fill("black");
    textFont("Georgia");
    textSize(50);
    text(text1, 210, 75);
    text(text2, 165, 140);

    textSize(30);
    text("Catch the thief", width / 3, 180);
    text("before he runs out", 180, 222);
    text("with your money!", 185, 264);

    continueButton.setCollider("rectangle", 0, 0);

    if (mousePressedOver(continueButton)) {
      continueButton.visible = false;
      continueButton2.visible = false;
      bg.visible = true;
      ground.visible = true;
      gameState = "playlevel1";
    }
  }

  if (gameState === "playlevel1") {

    if (boy.collide(wallGroup)) {
      console.log("collided");
      score = score + 1;
    }

    obstaclesLevel1();
    boy.collide(ground);

    if (bg.x < 500) {
      bg.x = 1480;
    }

    boy.x = 50;
    thief.x = 500;
    thief.y = 360;


    if (keyDown("space") && boy.y >= 350) {
      boy.velocityY = -18;
    }

    boy.velocityY = boy.velocityY + 0.8;
    spawnBirds();
    

    boy.setCollider("rectangle", 0, 0, 50, 120)

    boy.collide(wallGroup);

    if (boy.isTouching(carGroup) || boy.isTouching(spikeSetGroup)) {
      gameState = "endlevel1";
    }

    // U CAN CHANGE THE > 40 AS PER YOUR REQUIREMENT
    if (score>40){
      gameState="startlevel2";
      levelJustChanged=1
    }

    drawSprites();
    //change
    strokeWeight(3);
    stroke("black");
    textFont("Courier New");
    fill("lime");
    textSize(30);
    text("Score:" + score, 430, 23);
  }

  if (gameState === "startlevel2") {
   
    if(levelJustChanged===1) {
      resetGameLevel1();
      levelJustChanged = 0
      bg.changeImage("bg2",bg2Image);
      boy.visible = true;
      thief.visible = true;
    }
    
    bg.velocityX = -3;

    boy.collide(ground);

    spawnBirds();
    console.log("Entering Level2");
    setupLevel2();

    if (bg.x < 500) {
      bg.x = 1480;
    }

    //u need to repeat code for the boy's jump etc to keep the game going

    drawSprites();
  }

  if (gameState === "endlevel1") {
    //boy.collide(ground);
    resetGameLevel1();
    drawSprites();
    fill("black")
    strokeWeight(4);
    stroke("blue");
    textAlign(CENTER);
    textSize(100);
    text("Game Over", 300, 150);

    fill("lime");
    strokeWeight(3);
    stroke("red");
    textSize(50);
    text("Your Score: " + score, 300, 220);

  }
}

function obstaclesLevel1() {
  console.log("called obstacles")
  console.log(frameCount);
  if (frameCount % 500 === 0) {
    console.log("walls");
    wall = createSprite(700, 250, 200, 20);
    wall.velocityX = -6;
    wall.shapeColor = rgb(0, 0, 0);
    wall.setCollider("rectangle", 0, 0, 200, 20)
    wallGroup.add(wall);
  }

  if (frameCount % 500 === 0) {
    console.log("spikes");
    spikeSet = createSprite(700, 360);
    spikeSet.addImage("spikeSet", spikeSetImage);
    spikeSet.scale = 0.5;
    spikeSet.velocityX = -6;
    spikeSetGroup.add(spikeSet);
  }

  if (frameCount % 250 === 0) {
    console.log("cars");
    car = createSprite(1200, 370);
    car.addImage("car", carImage);
    car.scale = 0.3;
    car.velocityX = -6;
    car.setCollider("rectangle", 0, 0, 300, 150);
    carGroup.add(car);
  }
}

function setupLevel2(){  
  wallGroup = new Group();
  spikeSetGroup = new Group();
  carGroup = new Group();
  birdGroup = new Group();

  // u need to call obstacleLevel2() in line no 245 which is at the end of this code
  // u need to code inside the obstacleLevel2() to generate new obstacles
  //right now i called obstacleLevel1() just to check that the obstacles spawn or not
  obstaclesLevel1();
}

function resetGameLevel1(){
    bg.velocityX = 0;
    
    wallGroup.destroyEach();
    spikeSetGroup.destroyEach();
    carGroup.destroyEach();
    birdGroup.destroyEach();

    boy.collide(ground);
    boy.visible=false;
    thief.visible=false;
}

function spawnBirds(){
  if (frameCount % 500 === 0) {
    bird = createSprite(-100, 70);
    bird.addAnimation("bird", birdImage);
    bird.scale = 0.4;
    bird.velocityX = 1;
    birdGroup.add(bird);
  }
}

function obstaclesLevel2(){

}