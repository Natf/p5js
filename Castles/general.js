class General {
  
    constructor(genomeName, mutationName, castles, x, y) {
      this.assignDNA(genomeName, mutationName, castles, x, y);
      this.wins = 0;
      this.generalsIBeat = [];
      this.defeatedByBest = false;
    }
  
    getAndResetWins() {
      let totalWins = this.wins;
      this.wins = 0;
      this.generalsIBeat = [];
      this.defeatedByBest = false;
      
      return totalWins;
    }
  
    makeRandom() {
      this.assignDNA(
        "test", 
        "random", 
        this.getRandomCastles(), 
        this.x, 
        this.y, 
        this.randomColor()
      );
    }
  
    assignDNA(genomeName, mutationName, castles, x, y, color = null) {
      this.genomeName = genomeName;
      this.mutationName= mutationName;
      this.castles = castles;
      this.x = x;
      this.y = y;
      
      if (color === null) {
        this.color = this.randomColor();
      } else {
        this.color = color;
      }
    }

    doBattle(opposingGeneral, sim = false) {
      let myPoints = 0;
      let opposingPoints = 0;
      
      for (let i = 0; i < 10; i++) {
        if (isNaN(this.castles[i])) {
          this.castles[i] = 0;
        }
        if (this.castles[i] > opposingGeneral.castles[i]) {
            myPoints += (i+1);
        } else if(this.castles[i] < opposingGeneral.castles[i]) {
            opposingPoints += (i+1);
        } else {
            myPoints += ((i+1)/2);
            opposingPoints += ((i+1)/2);
        }
      }
      if (myPoints > opposingPoints) {
        this.wins ++;
        if (!sim) {
          this.generalsIBeat.push(opposingGeneral);
        }
      } else if (myPoints < opposingPoints && !sim) {
        opposingGeneral.wins++;
        opposingGeneral.generalsIBeat.push(this);
      }
    }
  
    thisWasBestGeneral() {
      this.generalsIBeat.forEach((general) => {
        general.defeatedByBest = true;
      });
    }
  
    draw() {
      set(this.x, this.y, this.color);
    }
  
    copy(anotherGeneral) {
      this.assignDNA(
        anotherGeneral.genomeName, 
        anotherGeneral.mutationName, 
        anotherGeneral.castles.slice(), 
        this.x, 
        this.y,
        color(anotherGeneral.color)
      )
    }
  
    mutate(newColor = null) {
      for (let i = 0; i < 10; i++) {
        var randomIndexOne = Math.floor(Math.random() * 10);
        var randomIndexTwo = randomIndexOne;

        do {
          randomIndexTwo = Math.floor(Math.random() * 10);
        } while (randomIndexTwo === randomIndexOne)
          
        let change = parseFloat(random(10).toFixed(1));
        
        if (this.castles[randomIndexOne] < change) {
          change = this.castles[randomIndexOne];
        }
        this.castles[randomIndexOne] = this.castles[randomIndexOne] - change;
        this.castles[randomIndexTwo] = this.castles[randomIndexTwo] + change;
      }
      
      this.normalize();
        
        
      let randomChange = random(2);
      let randomChangeAmount = random(20) - random(20);
      this.color = color(this.color.levels[0]+randomChangeAmount,this.color.levels[1]+randomChangeAmount,this.color.levels[2]+randomChangeAmount, 255);
    }
  
  calculateColor() {
    let redAmount = this.castles[0] + this.castles[1] + this.castles[2] + this.castles[3];
    
    let greenAmount = this.castles[4] + this.castles[5] + this.castles[6];
    
    let blueAmount = this.castles[7] + this.castles[8] + this.castles[9];
    
    redAmount = (redAmount*255) / 400;
    greenAmount = (greenAmount*255) / 300;
    blueAmount = (blueAmount*255) / 300;
    
    return color(redAmount, greenAmount, blueAmount, 255);
  }
  
  randomColor() {
    return color(random(100,255), random(100,255), random(100,255),255);
  }
  
  getRandomCastles() {
    this.castles[0] = random(100);
    this.castles[1] = random(100);
    this.castles[2] = random(100);
    this.castles[3] = random(100);
    this.castles[4] = random(100);
    this.castles[5] = random(100);
    this.castles[6] = random(100);
    this.castles[7] = random(100);
    this.castles[8] = random(100);
    this.castles[9] = random(100);
    
    this.normalize();
    
    return this.castles;
  }
  
  normalize() {
    let length = this.castles[0] +
        this.castles[1] +
        this.castles[2] +
        this.castles[3] +
        this.castles[4] +
        this.castles[5] +
        this.castles[6] +
        this.castles[7] +
        this.castles[8] +
        this.castles[9];
        
    length = length / 100;
    this.castles[0] = this.castles[0] / length;
    this.castles[1] = this.castles[1] / length;
    this.castles[2] = this.castles[2] / length;
    this.castles[3] = this.castles[3] / length;
    this.castles[4] = this.castles[4] / length;
    this.castles[5] = this.castles[5] / length;
    this.castles[6] = this.castles[6] / length;
    this.castles[7] = this.castles[7] / length;
    this.castles[8] = this.castles[8] / length;
    this.castles[9] = this.castles[9] / length;
  }
  
  simBattles(generals) {
    this.wins = 0;
    generals.forEach((general) => {
      this.doBattle(general, true);
    });
  }
  
  setAsAverage(lastTen) {
    this.castles = [0,0,0,0,0,0,0,0,0,0];
    lastTen.forEach((castles) => {
      this.castles[0] += castles[0];
      this.castles[1] += castles[1];
      this.castles[2] += castles[2];
      this.castles[3] += castles[3];
      this.castles[4] += castles[4];
      this.castles[5] += castles[5];
      this.castles[6] += castles[6];
      this.castles[7] += castles[7];
      this.castles[8] += castles[8];
      this.castles[9] += castles[9];
    });
    this.normalize();
  }
  
  drawBest(y) {
    set(0, 20+y, color((this.castles[0]*255)/100));
    set(1, 20+y, color((this.castles[1]*255)/100));
    set(2, 20+y, color((this.castles[2]*255)/100));
    set(3, 20+y, color((this.castles[3]*255)/100));
    set(4, 20+y, color((this.castles[4]*255)/100));
    set(5, 20+y, color((this.castles[5]*255)/100));
    set(6, 20+y, color((this.castles[6]*255)/100));
    set(7, 20+y, color((this.castles[7]*255)/100));
    set(8, 20+y, color((this.castles[8]*255)/100));
    set(9, 20+y, color((this.castles[9]*255)/100));
  }
}