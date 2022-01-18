class MapPoint {
  // 1 = sand;
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rPixels = [];
    this.gPixels = [];
    this.bPixels = [];
    this.aPixels = [];
    this.changed = false;
    
    this.pdSquare = pixelDensity()*pixelDensity();
    
    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        // loop over
        let index = 4 * ((this.y * d + j) * width * d + (this.x  * d + i));
        this.rPixels.push(index);
        this.gPixels.push(index+1);
        this.bPixels.push(index+2);
        this.aPixels.push(index+3);
      }
    }
    this.type = null;
    this.oldtype = null;
    this.neighbors = {};
  }
  
  draw(pixels) {
    if (this.oldtype === this.type) {
      return;
    } else {
      this.oldtype = this.type;
        if (this.type === 1) {
          for (let i = 0; i < this.pdSquare; i++) {
            pixels[this.rPixels[i]] = 200;
            pixels[this.gPixels[i]] = 200;
            pixels[this.bPixels[i]] = 0;
          }
      } else {
        for (let i = 0; i < this.pdSquare; i++) {
            pixels[this.rPixels[i]] = 0;
            pixels[this.gPixels[i]] = 0;
            pixels[this.bPixels[i]] = 0;
          }
      }
    }
  }
  
  update() {
    if (this.type === null || this.changed) {
      this.changed = false;
      return;
    } else {
      if (this.type === 1) {
        if ("bottom" in this.neighbors) {
          if(this.neighbors.bottom.type !== 1){
            this.neighbors.bottom.setType(1);
            this.type = null;
            return;
          }
        }
        if (("bottomleft" in this.neighbors) && ("bottomright" in this.neighbors)) {
          
          let leftRight = null;
          if (random(2) >=1) {
            leftRight = this.neighbors.bottomright;
          } else {
            leftRight = this.neighbors.bottomleft;
          }
          if (leftRight.type !== 1) {
            leftRight.setType(1);
            this.type = null;
            return;
          }
        }
      }
    }
  }
  
  setType(type) {
    this.changed = true;
    this.type = type;
  }
}