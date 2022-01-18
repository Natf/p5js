let generals = [];
let bestGenerals = [];
let filename = "castle-solutions-4.csv";
var playing = true;

var lastTen = [];

function preload() {
  var rawStrings = loadStrings(filename,loadCSV);
}

function setup() {
  frameRate(2);
  pixelDensity(10);
  createCanvas(40, 400);
  $('.play').on("click", function() {
    if (playing) {
      noLoop();
      $('.play').text("play");
      playing = false;
    } else {
      loop();
      $('.play').text("pause");
      playing = true;
    }
  });
}

function compareGeneralWins( generalA, generalB ) {
  if ( generalA.wins > generalB.wins ){
    return -1;
  }
  if ( generalA.wins < generalB.wins ){
    return 1;
  }
  return 0;
}

function draw() {
  generals.forEach((general) => {general.draw();});
  bestGeneralsBattle();
  bestGenerals.forEach((general, index) => {general.drawBest(index);});
  updatePixels();
  step();
  
  generals.forEach((general) => {general.getAndResetWins();});
  
  
  
  
 /* generals.forEach((general) => {
    if (Math.floor(Math.random() * 10) === 0) {
      general.mutate(randomColor());
    }
  });*/
}

function bestGeneralsBattle() {
  bestGenerals.forEach((general) => {general.getAndResetWins();});
  
  for(let gOne = 0; gOne < bestGenerals.length; gOne++) {
    for (let gTwo = gOne + 1; gTwo < bestGenerals.length; gTwo++) {
      bestGenerals[gOne].doBattle(bestGenerals[gTwo]);
    }
  }
  
  
  bestGenerals.sort(compareGeneralWins);
  let bestofBest = bestGenerals[0];
  
  if (bestofBest !== undefined) {
  
  $('.strongestbest').text("Best of Best " + bestofBest.castles.map(oneSigFig) + " Wins:"+bestofBest.wins);
  }
}


function step() {
  console.log("step");
  doBattles();
  sortWeak();
  lastTen.push(generals[0].castles);
  if (lastTen.length > 10) {
    lastTen.shift();
  }
  
  generals[99].setAsAverage(lastTen);
  let averageCastles = generals[99].castles.map(oneSigFig);
  generals[99].simBattles(generals.slice(0,-2));
  $('.average').text("Average " + averageCastles + " Wins:"+generals[99].wins);
}

function oneSigFig(num) {
  return num.toFixed(1);
}

function sortWeak() {
  generals.sort(compareGeneralWins);
  let strongestGeneral = generals[0];
  let strongestCastles = strongestGeneral.castles.map(oneSigFig);

  $('.strongest').text("Strongest " + strongestCastles + " Wins:"+strongestGeneral.wins);
  strongestGeneral.thisWasBestGeneral();
  bestGenerals.push(Object.assign(Object.create(Object.getPrototypeOf(strongestGeneral)), strongestGeneral));
  
  generals.forEach((general, index) => {
    if(index !== 0 && general.defeatedByBest) {
      general.copy(strongestGeneral);
      general.mutate();
    }
  });
  
  for (let i = 80; i< 85; i++) {
    generals[i].makeRandom();
  }
}

function doBattles() {
  for(let gOne = 0; gOne < generals.length; gOne++) {
    for (let gTwo = gOne + 1; gTwo < generals.length; gTwo++) {
      generals[gOne].doBattle(generals[gTwo]);
    }
  }
}

function loadCSV(rawStrings) {
  generals = [];
  
  for (let i = 1; i < 401; i++) {
    let x = ((i - 1)%20);
    let y = Math.floor((i-1)/20);
    let castleValuesAsString = rawStrings[i].split(",");
    var castleValues = castleValuesAsString.map(function (x) { 
  return parseInt(x); 
});
    let newGeneral = new General("test","Test",castleValues,x,y);
    generals.push(newGeneral);
  }
  
  console.log(generals);
}

function randomColor() {
  return color(random(255), random(100,200), random(100),255);
}