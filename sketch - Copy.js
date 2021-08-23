var man;
var bg;
var invisibleGround;
var gameState = "START"
 var obstacleGroup;
 var waterGroup;
 var score = 0;
 var life = 185;
 var select;

var rewardGroup;
function preload(){
  man_img = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png");
  bg_img = loadImage("d1.jpg");

  obstacle1 = loadImage("catus1.png");
  obstacle2 = loadImage("catus2.png");
  obstacle3 = loadImage("catus3.png");
  obstacle4 = loadImage("stone1.png");
  obstacle5 = loadImage("stone2.png");

  water_img = loadImage("enegy.png");

  gameOver = loadAnimation("gameOver.png")

  coin = loadImage("coin.png") 
  coin2 = loadImage("diamond.png");

  lifeImage = loadImage("life.png");

  up_img = loadImage("up_arrow.png");

  select_img = loadImage("play.png")
}

function setup(){
  createCanvas(800,350);

  bg = createSprite(400,50,800,350);
  bg.addImage("b", bg_img);
  //bg.scale = 0.7


  man = createSprite(100,300,50,50);
  man.addAnimation("m", man_img);
  man.addAnimation("go", gameOver)
  //man.debug = true
  man.setCollider("circle",0,0,40)
  man.scale = 0.8;
  man.visible = false;
 // man.frameDelay = 10;

 invisibleGround = createSprite(600,320,1200,10);
 invisibleGround.visible = false;

select1 = createSprite(360,200,50,50);
select1.scale = 0.2
select1.addImage(select_img);
select1.visible = true;

 obstacleGroup = createGroup();
 waterGroup = createGroup();
 rewardGroup = createGroup();
}

function draw(){

  //background(0);
  drawSprites();
  

  if(gameState === "START"){
   

   fill("white")
   textSize(35)

   text("The Humble Runner", 300,50);
   text("Press", 250,140)
   image(up_img,360,100,50,50)
   fill("white")
   textSize(35)
   text("to jump", 420,140)

    
    if(mousePressedOver(select1)){
      select1.visible = false;
      gameState = "PLAY"
    }

   
  }

  else if(gameState === "PLAY"){

    fill("white");
  text("Score: " +score,700,40);

    man.visible = true;
    bg.velocityX = -4;

    select1.visible = false;

    push();
    image(water_img, width / 2 - 350, height - 350, 50, 50);
    fill("white");
    rect(width / 2 - 300, height - 325, 185, 20);
    fill("skyblue");
    rect(width / 2 - 300, height - 325, life, 20);
    noStroke();

    
  pop();

    if(bg.x < 0){
      bg.x = bg.width/2
    }
  
    if(keyIsDown(UP_ARROW)&& man.y >= 100) {
      man.velocityY = -12;
      life -= 10
    }
    
    man.velocityY = man.velocityY + 0.5;

    var rand = Math.round(random(1,2));
    
    if(rand === 1){
      spawnObstacles();
    }
    else if(rand === 2){
      spawnReward();
    }
   
    spawnWater();
    
    if(rewardGroup.isTouching(man)){
      for(var i = 0; i < rewardGroup.length; i++){
        if(rewardGroup.get(i).isTouching(man)){
          rewardGroup.get(i).destroy();
        }
      } 
      score += 10
    }
   
    if(waterGroup.isTouching(man) && life < 160){
      life += 20;
      for(var i = 0; i < waterGroup.length; i++){
        if(waterGroup.get(i).isTouching(man)){
          waterGroup.get(i).destroy();
        }
      }
    }

    if (obstacleGroup.isTouching(man) || life <0){
      for(var i = 0; i < obstacleGroup.length; i++){
        if(obstacleGroup.get(i).isTouching(man)){
          obstacleGroup.get(i).destroy();
        }
      }
      gameState = "END"
    }


     
  
  }

  else if(gameState === "END"){
    bg.velocityX = 0;
    man.velocityY = 0;
    man.changeAnimation ("go",gameOver);
    man.x = 400;
    man.y = 175;
    obstacleGroup.destroyEach();
    rewardGroup.destroyEach();
    waterGroup.destroyEach();

    


    textSize(30)
    fill("white")
    text(" Your Score: " +score,width/2 -125,height/2 + 50);
    //text("Oops! Game Over", 500,200)
  }
 

  man.collide(invisibleGround);
  

  


}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(1250,280,50,40);

    obstacle.velocityX = -5;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,40)

    var rand = Math.round(random(1,5));

    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2: obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      default: break;
    }

    obstacle.scale = 0.3;
    obstacleGroup.add(obstacle)
  }
}

  function spawnReward(){
    if(frameCount % 100 === 0){
      reward = createSprite(1250,280,50,40);
  
      reward.velocityX = -5;
      //reward.debug = true;
      reward.setCollider("circle",0,0,40)
  
      var rand = Math.round(random(1,2));
  
      switch(rand){
        case 1: reward.addImage(coin);
        break;
        case 2: reward.addImage(coin2);
        break;
       
        default: break;
      }
  
      reward.scale = 0.2;
      rewardGroup.add(reward)
    }


}

function spawnWater(){
  if(frameCount % 200 === 0){
    water = createSprite(1250,random(50,150),50,40);

    water.velocityX = -5;

    water.addImage("water1",water_img)
    water.scale = 0.1;
    waterGroup.add(water)
  }


}