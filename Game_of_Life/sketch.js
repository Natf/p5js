let allCells = [];
let width=500;
let height =500;
function setup() {
 // var width = 400;
//  var height = 400;
  
  createCanvas(width, height);
  
  for (var x = 0; x < width; x+=2) {
      allCells[x] = [];
      for (var y = 0; y < height; y+=2) {
        allCells[x][y] = new Cell(x, y);
        allCells[x][y].x = x;
        allCells[x][y].y = y;
        
        if (Math.round(random(10)) == 1) {
          allCells[x][y].alive = true;
        }
      }
  }

// set neighbors
  for (var x = 0; x < width; x+=2) {
    for (var y = 0; y < height; y+=2) {
      /*if((x-2) < 0 || (y-2) < 0) {
        continue;
      }
      if((x+2) > 398 || (y+2) > 398) {
        continue;
      }*/
      let xmin= x-2;
      if (xmin < 0 ){
        xmin = width-2;
      }
      let ymin = y-2;
      if (ymin < 0){
        ymin = height-2;
      }
      let xmax = x+2;
      if (xmax >= width){
        xmax = 0;
      }
      let ymax = y+2;
      if (ymax >= height){
        ymax=0;
      }
      allCells[x][y].neighbors = new Array();

      
        allCells[x][y].neighbors.push(allCells[xmin][y]);
        allCells[x][y].neighbors.push(allCells[xmin][ymin]);
           allCells[x][y].neighbors.push(allCells[x][ymin]);
        allCells[x][y].neighbors.push(allCells[xmax][y]);
      allCells[x][y].neighbors.push(allCells[xmax][ymax]);
      allCells[x][y].neighbors.push(allCells[x][ymax]);
        allCells[x][y].neighbors.push(allCells[xmin][ymax]);
      allCells[x][y].neighbors.push(allCells[xmax][ymin]);
    } 
  }
}


function draw() {
  if (frameCount % 5 == 0) {
    for (var x = 0; x < width; x+=2) {
      for (var y = 0; y < height; y+=2) {
        allCells[x][y].update();
      }
    }
    
    for (var x = 0; x < width; x+=2) {
      for (var y = 0; y < height; y+=2) {
        allCells[x][y].setNewAlive();
      }
    }

    var seed ="";
    background(0);

    drawAllCells();
  }
  
  //rect(10,10,10,10);
}

function drawAllCells() {
  
  for (var x = 0; x < width; x+=2) {
    for (var y = 0; y < height; y+=2) {
      allCells[x][y].show();
    }
  }
}