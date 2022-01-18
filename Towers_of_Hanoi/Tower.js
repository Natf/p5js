function Tower() {
  this.towerX = 60;
  this.towerY = 70;
  this.towerWidth = 30;
  this.towerHeight = 300;
  this.toriStack = new Array();
  
  this.draw = function() {
    fill(0);           
                  rect(this.towerX,this.towerY,this.towerWidth,this.towerHeight);
  }
  
  this.mouseClicked = function(mouseX, mouseY, torus) {
    if (insideRect(mouseX,mouseY, this.towerX, this.towerY, this.towerWidth, this.towerHeight)) {
      if (this.toriStack.length == 0 || this.toriStack[this.toriStack.length-1].torusSize > torus.torusSize) {
      return this.toriStack.length;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  this.addTorus = function (torus) {
    for (var i = 0; i < this.toriStack.length; i++) {
      this.toriStack[i].placeInStack ++;
    }
    this.toriStack.push(torus);
  }
  
  this.removeTorus = function () {
    let torus = this.toriStack.pop();
    for (var i = 0; i < this.toriStack.length; i++) {
      this.toriStack[i].placeInStack --;
    }
    return torus;
  }
  
  function insideRect(x,y,h,k,width,height) {
    return (x>h && x<(h+width)) &&(y>k && y<(y+height));
  }
}