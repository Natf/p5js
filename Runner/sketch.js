var mainRunner, secondRunner;
var secondRunnerSpeed = 19.21162109375;
var increment = 0.0001;
var increasedBefore = true;
var fps = 60;
var stepSize = 0.00001;
var stepsTotake = 1000;


function setup() {
  frameRate(fps);
  pixelDensity(6);
  createCanvas(100, 100);
  background(220);
  stroke(1);
  
  mainRunner = new Runner(createVector(10,50), 15, createVector(90,50));
  secondRunner = new Runner(createVector(10,10), secondRunnerSpeed, mainRunner);
}

function draw() {
  for (let i = 0; i < stepsTotake; i++) {
    stepAndDraw();
    checkIfThere();
  }
}

function resetRunners() {
  background(220);
  mainRunner.reset();
  secondRunner.reset(secondRunnerSpeed);
}

function stepAndDraw() {
  mainRunner.step(stepSize);
  secondRunner.step(stepSize);
  mainRunner.draw();
  secondRunner.draw();
}

function checkIfThere() {
  if (mainRunner.atDestination() && secondRunner.atDestination()) {
    noLoop();
    console.log("speed found - "+secondRunnerSpeed);
  } else if (mainRunner.atDestination()) {
    
    if (!increasedBefore) {
      increment = increment/2;
    }
    secondRunnerSpeed += increment;
    
    console.log("second runner too slow trying new speed - " + secondRunnerSpeed);
    
    increasedBefore = true;
    resetRunners()
  } else if (secondRunner.atDestination()) {
    if (increasedBefore) {
      increment = increment/2;
    }
    secondRunnerSpeed -= increment;
    
    
    console.log("second runner too fast trying new speed - " + secondRunnerSpeed);
    
    increasedBefore = false;
    resetRunners()
  }
}