class Runner {
  constructor(position, speed, target) {
    this.start = position.copy();
    this.target = target;
    this.reset(speed);
  }
  
  step(stepSize) {
    this.last = this.now.copy();
    let destination = this.getDestination();
    
    let stepVel = destination.copy().sub(this.now).normalize();
    
    stepVel.mult( stepSize * this.speed );
        
    stepVel.limit(this.now.dist(destination));
    
    this.now.add(stepVel);
  }
  
  draw() {
    if (!this.last.equals(this.now)) {
      line(this.last.x, this.last.y, this.now.x, this.now.y);
    }
  }
  
  getDestination() {
    if (this.target instanceof Runner) {
      return this.target.now;
    }
    return this.target;
  }
  
  atDestination() {
    return this.now.equals(this.getDestination());
  }
  
  setSpeed(speed) {
    this.speed = speed;
  }
  
  reset(speed = 15) {
    this.setSpeed(speed);
    this.last = this.start.copy();
    this.now = this.start.copy();
  }
}