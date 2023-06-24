var blocks = [];
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
var level = {
  width: 0,
  height: 0,
  value: 0
};
var keys = {};
var blendPoints;
function keyPressed() {
  keys[keyCode] = keys[key.toString().toLowerCase()] = true;
  if (keyCode === 82) {
    player.x = player.respawn.x;
    player.y = player.respawn.y;
    player.yvel = 0;
    player.state.gravity = "down";
    player.x2 = player.respawn.x2;
    player.y2 = player.respawn.y2;
    player.yvel2 = 0;
    player.state.gravity = "down";
    player.state.gravity2 = "up";
  }
}
function keyReleased() {
  // alternatively set it to false using keys[keyCode] = false;
  delete keys[keyCode];
  delete keys[key.toString().toLowerCase()];
};
var font;
function setup() {
  createCanvas(windowWidth, windowHeight);
  blendPoints = [
    [0, height / 2],
    [width, height / 2],
    [width, height],
    [0, height]
  ];
  font = loadFont('Montserrat-ExtraBold.ttf');
  Load(blocks, worldMap[level.value]);
  for (var i = 0; i < 20; i++) {
    particles.push(
      [random(0, 50), random(0, 50), 5]
    );
  }
  scene.prepare();
}

function draw() {
  scene.BG();
  scene.Game();
}
