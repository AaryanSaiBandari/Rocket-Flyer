var spaceImg, space;
var rocket, rocketImg;
var meteor, meteorImg, meteorGroup;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  spaceImg = loadImage("space.png");
  rocketImg = loadImage("rocket.png");
  happySound = loadSound("music.mp3");
  meteorImg = loadImage("meteor.png")
}

function setup(){
  createCanvas(600,600);
  happySound.loop();
  space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 3;
  
  meteorGroup = new Group();
  invisibleBlockGroup = new Group();
  
  rocket = createSprite(200,200,50,50);
  rocket.scale = 0.2;
  rocket.addImage("rocket", rocketImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(space.y > 400){
      space.y = 300
    }
    spawnMeteor ();

  if (meteorGroup.isTouching(rocket)) {
    rocket.velocityY = 0;
  }

    if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
      rocket.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("white");
    fill("white");
    textSize(30);
    text("Game Over. Try Again...", 150,250)
  }

}

function spawnMeteor() {

  if (frameCount % 440 === 0) {
    var meteor = createSprite(200,10);
    meteor.scale=0.1;
    meteor.velocityY=7;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible=false;
    invisibleBlock.width = meteor.width;
    invisibleBlock.height = 2;
    
    meteor.x = Math.round(random(120,400));
    invisibleBlock.x = meteor.x;
    
    meteor.addImage(meteorImg);
    
    meteor.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    rocket.depth = meteor.depth;
    rocket.depth +=1;
   
    meteor.lifetime = 800;
    invisibleBlock.lifetime = 800;

    meteorGroup.add(meteor);
    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}