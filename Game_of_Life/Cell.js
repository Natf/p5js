function Cell() {
  this.alive = false;
    
  this.setAlive = function(alive) {
    this.alive = alive;
  }
  this.isAlive = function() {
    return this.alive;
  }
  
  this.show = function() {
    if(this.alive) {
      fill(255);
    } else {
      return;
    }
    
    noStroke();
    
    rect(this.x, this.y, 2, 2);
  };
  
  this.update = function() {
    // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    var alives = 0;
    if (this.neighbors === undefined) {
      return;
    }
    for (var i =0; i < this.neighbors.length; i++) {
      if (this.neighbors[i] !== undefined) {
        if(this.neighbors[i].alive) {
          alives++;
        }
      }
    }
    if (this.alive && (alives == 2 || alives == 3)) {
      this.newAlive = this.alive;
      return;
    } else if ((!this.alive) && (alives == 3)) {
      this.newAlive = true;
    } else if (this.alive) {
      this.newAlive= false;
    }
  }
  
  this.setNewAlive = function() {
    this.alive = this.newAlive;
  }
}