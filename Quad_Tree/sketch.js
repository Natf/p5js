var qTree;

function setup() {
  createCanvas(400, 400);

  let boundary = new Rectangle(200, 200, 200, 200);
  qTree = new QuadTree(boundary, 4);
  console.log(qTree);
  for (let i = 0; i< 300; i++) {
    let x = randomGaussian(width/2, width/8);
    let y = randomGaussian(height/2, height/8);
    let p = new Point(x, y);
    qTree.insert(p);

  }
  background(0);
  qTree.show();

  stroke(0, 255, 0);
  rectMode(CENTER);

  let range = new Rectangle(random(width), random(height), 100, 100);
  rect(range.x, range.y, range.w*2, range.h*2);
  let points = qTree.query(range);
  console.log(points);

  for (let p of points) {
    strokeWeight(2);
    point(p.x,p.y);
  }
  /*for (let i = 0; i < 500; i++) {
      let p = new Point (random(width), random(height));
      qTree.insert(p);
  }*/
}


/*function draw() {
  if(mouseIsPressed) {
    for(let i = 0; i < 5; i++) {
      let m = new Point(mouseX+random(-10,10), mouseY+random(-10,10));
      qTree.insert(m);
    }
  }

  background(0);
  qTree.show();

 stroke(0, 255, 0);
 rectMode(CENTER);
 rect(250, 250, 107, 92);
}*/
