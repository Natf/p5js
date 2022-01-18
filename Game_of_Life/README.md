
# [Conway's Game of Life created using p5js](https://github.com/Natf/p5js/tree/master/Game_of_Life)

A basic implementation of John Conway's game of life.
The app will generate a grid of cells that are randomly dead or alive.
Each cell stores a list of all of its neighbors. Each draw cycle each cell will decide to be in a dead or alive state using Conway's rules.

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

![Preview of game of life running](https://raw.githubusercontent.com/Natf/p5js/master/Game_of_Life/game-of-life.gif)
