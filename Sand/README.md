
# [Falling Sand in p5js](https://github.com/Natf/p5js/tree/master/Sand)

A simple [faling sand game](https://en.wikipedia.org/wiki/Falling-sand_game).
The user can click anywhere in the window to create sand that will fall and then create pleasant looking piles of sand.

![Preview of falling sand game](https://raw.githubusercontent.com/Natf/p5js/master/Sand/falling-sand-small.gif)

The game will create a point for each pixel and then calculate the neighbors for each of these points on setup. When running the game will loop through each point. An active "sand" point will then check if there is a free space below it and move down if there is. It will randomly choose the bottom right or bottom left and try to move there.

From  /Sand/MapPoint.js
```javascript
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
      leftRight.type = 1;
      this.type = null;
      return;
    }
  }
}
```
