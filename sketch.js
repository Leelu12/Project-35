var balloon;

function preload() {
  bg = loadImage('Hot Air Ballon-01.png');
  balloonImage = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1365,650);
  balloon = createSprite(100, 400, 20, 20);
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;
  balloonHeight = database.ref("balloon/height");
  balloonHeight.on("value", readHeight, showError);
}


function draw() {
  background(bg);
  
  if(keyDown(LEFT_ARROW)) updateHeight(-10, 0);
  else if(keyDown(RIGHT_ARROW)) updateHeight(10, 0);
  else if(keyDown(UP_ARROW)) 
  {
    updateHeight(0, -10);
    balloon.scale = balloon.scale + 0.01;
  }  
  else if(keyDown(DOWN_ARROW)) 
  {
    updateHeight(0, 10);
    balloon.scale = balloon.scale - 0.01;
  }  

  textSize(20);
  fill("blue");
  text("Use UP, DOWN, LEFT, RIGHT arrow keys to move the Hot Air Balloon.",50,50);

  drawSprites();
}
function readHeight(data)
{
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError()
{
  console.log("Error in writing to the database");
}
function updateHeight(x, y)
{
    database.ref("balloon/height").set({'x': height.x + x, 'y': height.y + y});
}