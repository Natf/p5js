fireworks = []
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for(let i = 0; i < fireworks.length; i++) {
    if(fireworks[i].draw(millis())) {
      fireworks.shift();
      i--;
    }
  }
}

function touchEnded() {
  mouseClicked();
  return false;
}

function mouseClicked() {
  let firework = new Firework(mouseX, mouseY, millis());
  fireworks.push(firework);
}

document.ontouchmove = function(event) {
    event.preventDefault();
};
document.touchmove = function(event) {
    event.preventDefault();
};