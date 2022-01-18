class Firework {
  constructor(x,y, millis) {
    this.speed = -200;
    this.timer = millis + 1000;
    this.boomstart = false;
    this.x = x;
    this.y = y;
    this.particles = 100;
    this.xpoints = [];
    this.ypoints = [];
    for (let i = 0.0; i < this.particles; i++) {
      this.xpoints.push(Math.cos(i*3.6));
      this.ypoints.push(Math.sin(i*3.6));
    }
  }
  
  draw(millis) {
    fill(255);
    
    if (this.timer <= millis) {
      if (this.boomstart === false) {
        this.boomstart = millis;
        
      }
      return this.drawBoom(millis);
    } else {
      rect (this.x,this.y,2,10)
      this.y+= (this.speed/60)
      return false;
    }
  }
  
  drawBoom(millis) {
    fill(random(255),random(255),random(255));
    var scale = ((millis-this.boomstart)/5);
    for (let i = 0.0; i < this.particles; i++) {
      // circle eq  ( x − a ) 2 + ( y − b ) 2 = r 2
      // use cosin for xy
      let x = this.x + this.xpoints[i]*(scale + (random(3) - random(3)));
      let y = this.y + this.ypoints[i]*(scale + (random(3) - random(3)));
      ellipse(x,y,4,4);
    }
    if (scale > 70) {
      return true;
    }
    return false;
  }
}