function load_images() {
  //This function loads images for player , virus(aka CoronaVirus :) ) and gem
  enemy_image = new Image();
  enemy_image.src = "./Assets/v1.png";

  player_image = new Image();
  player_image.src = "./Assets/superhero.png";

  gem_image = new Image();
  gem_image.src = "./Assets/gemm.png";
}
function init() {
  // define the objects that we will have in the game
  canvas = document.getElementById("mycanvas");
  console.log(canvas);
  W = 700;
  H = 400;
  canvas.height = H;
  canvas.width = W;
  game_over = false;
  //create a context
  pen = canvas.getContext("2d");

  //enemy positions on canvas
  e1 = {
    x: 150,
    y: 50,
    w: 60,
    h: 60,
    speed: 20,
  };
  e2 = {
    x: 300,
    y: 150,
    w: 60,
    h: 60,
    speed: 30,
  };
  e3 = {
    x: 450,
    y: 20,
    w: 60,
    h: 60,
    speed: 40,
  };
  enemy = [e1, e2, e3];

  player = {
    x: 20,
    y: H / 2,
    w: 60,
    h: 60,
    speed: 20,
    moving: false,
    health: 100,
  };
  gem = {
    x: W - 100,
    y: H / 2,
    w: 40 ,
    h: 60,
  };

  //EventListeners
  canvas.addEventListener("mousedown", function () {
    player.moving = true;
  });
  canvas.addEventListener("mouseup", function () {
    player.moving = false;
  });
}
// to detect 2D collision 
function overlap(rect1,rect2){
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) 
        {
            return true;
        }else{
            return false;
        }
     
}
function draw() {
  // clear the canvas area for the old frame
  pen.clearRect(0, 0, W, H);

  // draw image of player , virus and gem .
  pen.drawImage(player_image, player.x, player.y, player.w, player.h);
  pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }
  //displaying score
  pen.fillStyle = "white";
  pen.fillText("Score "+player.health,10,20);
}
function update() {
  // move the box
  if (player.moving == true) {
    player.x += player.speed;
    player.health += 20;
  }
  for(let i=0;i<enemy.length;i++){
      if(overlap(enemy[i],player)){
          player.health-=50;
          if(player.health<0){
              game_over = true;
              alert("Game Over"+player.health);
          }

      }
  }
  if (overlap(player, gem)) {
    alert("You won");
    game_over = true;
    return;
  }

  // update each enemy
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y >= H - enemy[i].h || enemy[i].y < 0) {
      enemy[i].speed *= -1;
    }
  }
}
function gameloop() {
  if (game_over === true) {
    clearInterval(f);
  }
  draw();
  update();
}

load_images();
init();

var f = setInterval(gameloop, 100);
