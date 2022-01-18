let towers = new Array();
let tori = new Array();
let value = 0;
let torusPickedUp = false;
for (var i = 0; i<3; i++) {
  let tower = new Tower();
  tower.towerX += ((350/3)*i);
  towers.push(tower);
}

for (var i = 3; i>=0; i--) {
  let torus = new Torus();
  torus.torusSize = i;
  torus.placeOnTower(towers[0],(3-i));
  torus.placeInStack = i;
  towers[0].toriStack.push(torus);
  tori.push(torus);
}

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(255);
  for (let i = 0; i < towers.length; i++) {
    towers[i].draw();
  }
  for (let i = 0; i < tori.length; i++) {
    tori[i].draw(mouseX, mouseY);
  }
}

function touchStarted() {
  mouseClicked();
  return false;
}

function touchEnded() {
  mouseClicked();
  return false;
}

function mouseClicked() {
  if (torusPickedUp != false) {
    for (let i = 0; i < towers.length; i++) {
      let placeOnStack = towers[i].mouseClicked(mouseX, mouseY, torusPickedUp);
      if (placeOnStack !== false) {
        towers[i].addTorus(torusPickedUp);
        torusPickedUp.placeOnTower(towers[i],placeOnStack);
        torusPickedUp.pickedUp = false;
        torusPickedUp = false;
        return;
      }
    }
    torusPickedUp.mouseClicked();
    torusPickedUp.towerOn.addTorus(torusPickedUp);
    torusPickedUp.pickedUp = false;
    torusPickedUp = false;
    return;
  }
  for (let i = 0; i < tori.length; i++) {
    if (tori[i].mouseClicked(mouseX, mouseY) != false) {
      torusPickedUp = tori[i];
      torusPickedUp.towerOn.removeTorus();
      return;
    }
  }
}

document.ontouchmove = function(event) {
    event.preventDefault();
};
document.touchmove = function(event) {
    event.preventDefault();
};