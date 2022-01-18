var totalGames = 0;
var redWins = 0;
var greenWins = 0;
var runs = 0;
var maxRuns = 1000;
var drawOnce = false;


function setup() {
    createCanvas(400, 100);
    frameRate(10);
}

function draw() {
    background(220);
    runs++;
    if (runs > maxRuns) {
        noLoop();
    }

    for (let a = 0; a < 100; a++) {
        if (arrowTournament() === "redwin") {
            redWins++;
        } else {
            greenWins++;
        }
    }
    textSize(10);
    text("Red wins: " + redWins + " avg(" + (redWins / totalGames) + ")", 10, 30);
    text("Green wins: " + greenWins + " avg(" + (greenWins / totalGames) + ")", 10, 60);
}

function arrowTournament() {
    totalGames++;
    let winner = null;
    while (winner === null) {
        let greenScore = 24;
        let redScore = 0;

        for (let i = 0; i < 3; i++) {
            switch (Math.floor(random(3))) {
                case 0:
                    redScore += 10;
                    break;
                case 1:
                    redScore += 9;
                    break;
                case 2:
                    redScore += 5;
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
