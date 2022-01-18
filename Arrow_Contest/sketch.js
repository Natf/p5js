var totalGames = 0;
var redWins = 0;
var greenWins = 0;


function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background(220);
  
  for (let a = 0; a < 100; a++) {
    if (arrowTournament() === "redwin") {
      redWins ++;
    } else {
      greenWins++;
    }
  }
  
  console.log("Red wins: " + redWins +" avg("+(redWins/totalGames)+")");
  
  console.log("Green wins: " + greenWins +" avg("+(greenWins/totalGames)+")");
}

function arrowTournament() {
  totalGames++;
  let winner = null;
  while (winner === null) {
    let greenScore = 24;
    let redScore = 0;
    
    for (let i =0; i < 3; i++) {
      switch(Math.floor(random(3))) {
         case 0:
             redScore +=10;
          break;
          case 1:
             redScore +=9;
          break;
          case 2:
             redScore +=5;
          break;
          default:
          break;
      }
    }
    
    if (greenScore > redScore) {
      winner = "greenwin";
    } else if (redScore > greenScore) {
      winner = "redwin";
    }
  }
  
  return winner;
}