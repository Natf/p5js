var allPoints = new Array();
var oldMillis = 0;
let diffs = [];
function setup() {
  createCanvas(400, 400);

  //return;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let mapPoint = new MapPoint(x, y, width, height);
      allPoints.push(mapPoint);
    }
  }
  
  for (let i = 0; i < allPoints.length; i++) {
    allPoints[i].neighbors = getNeighborsForPoint(allPoints[i].x, allPoints[i].y);
  }
  
  console.log("Generated "+ allPoints.length + " points for "+width+"x"+height+ " grid");
  
  background(0);
}

function draw() {
  drawFPS();
  
  if (mouseIsPressed) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      mouse();
    }
  }
  loadPixels();
  for (let i = 0; i < allPoints.length; i++) {
    allPoints[i].draw(pixels);
  }
  updatePixels();
  if(frameCount %1 == 0) {
    if (allPoints.length > 0)  {
      for (let i = allPoints.length - 1; i >= 0; i--) {
        allPoints[i].update();
      }
    }
  }
}

function drawFPS() {
  let newMillis = millis();
  fill(0);
  rect(8,width-25, 130, 20)
  let fps = frameRate();
  fill(255);
  stroke(0);
  let diff = newMillis - oldMillis;
  oldMillis = newMillis;
  diffs.push(diff);
  if (diffs.length > 100) {
    diffs.shift();
  }
  let diffAVG = 0;
  for (let i = 0; i < diffs.length; i++) {
    diffAVG += diffs[i];
  }
  diffAVG = diffAVG/diffs.length
  
  text("FPS: " + fps.toFixed(2) + " ms: "+diffAVG, 10, height - 10);
}

function mouse() {
  let pointsToSet = getNeighborsForPoint(mouseX, mouseY, true);
  for(let point in pointsToSet) {
    let pointsToSetMore = getNeighborsForPoint(pointsToSet[point].x, pointsToSet[point].y) 
    for(let more in pointsToSetMore) {
      pointsToSetMore[more].type = 1;
    }
  }
}

function touchMoved() {
  mouse();
  return false;
}

function getNeighborsForPoint(x, y, includeCenter = false) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return {};
  }
  
  let neighbors = {};
  let neighborOffsets = [
    [-1,1,"bottomleft"],[0,1,"bottom"],[1,1,"bottomright"],
    [-1,0,"left"],      [1,0,"right"],
    [-1,-1,"topleft"],[0,-1,"top"],[1,-1,"topright"]
  ];
  
  for (let i = 0; i < neighborOffsets.length; i++) {
    let xPos = x + neighborOffsets[i][0];
    let yPos = y + neighborOffsets[i][1];
    let neighborName = neighborOffsets[i][2];

    if (xPos >= 0 && xPos < width && yPos >= 0 && yPos < height) {
      let neighborIndex = xPos + (yPos * width);
      neighbors[neighborName] = allPoints[neighborIndex];
    }
  }
  if (includeCenter) {
    neighbors["center"] = allPoints[x + (y * width)];
  }
  return neighbors;
}
document.ontouchmove = function(event) {
    event.preventDefault();
};
document.touchmove = function(event) {
    event.preventDefault();
};