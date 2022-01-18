function Color(red,green,blue)
{
    this.red = red;
    this.green = green;
    this.blue = blue;
}
function Torus () {
  this.pickedUp = false;
  this.torusSize = 0;
  this.placeInStack = 0;
  this.drawPlace = 0;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 30;
  this.towerOn;
  this.colors = [
    new Color(255,0,0),
    new Color(255,150,0),
    new Color(100,170,255),
    new Color(150,0,255)
  ];
  
  this.draw = function (mouseX, mouseY) {
    fill (this.colors[this.torusSize].red,this.colors[this.torusSize].green,this.colors[this.torusSize].blue)
    if (this.pickedUp) {
      this.x = mouseX;
      this.y = mouseY;
    }
    
      ellipse(this.x,this.y,this.width,this.height);
  }
  
  this.placeOnTower = function(towerOn, drawPlace) {
    this.placeInStack = 0;
    this.drawPlace = drawPlace;
    this.towerOn = towerOn;
    this.x = towerOn.towerX + (towerOn.towerWidth/2);
    this.y = towerOn.towerY + (towerOn.towerHeight) - 15 -(30*this.drawPlace);
    this.width = 50 + (20*this.torusSize);
  }
  
  this.mouseClicked = function(mouseX, mouseY) {
    if (this.placeInStack != 0) {
      return false;
    }
    if (this.pickedUp) {
      var towerOn = this.towerOn;
      this.x = towerOn.towerX + (towerOn.towerWidth/2);
      this.y = towerOn.towerY + (towerOn.towerHeight) - 15 -(30*this.drawPlace);
      this.pickedUp = false;
      return false;
    }
    this.pickedUp  = insideEllipse(mouseX,mouseY, this.x, this.y, (this.width/2), (this.height/2));
    if (this.pickedUp ) {
      return this;
    } else {
      return false;
    }
  }
  
  function insideEllipse(x, y, h, k, rx, ry) {
    var p = ((Math.pow((x-h),2)/Math.pow(rx,2)) + (Math.pow((y-k),2)/Math.pow(ry,2)));
    return (p < 1);
  }
}