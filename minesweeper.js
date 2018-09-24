document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

// Variables for generating the board
var gridSize = 3;
var board = {cells: []}

// Audio
function soundClick(){
  var Audio = document.getElementById("click");
  Audio.play();
}
function soundWin(){
  var Audio = document.getElementById("win");
  Audio.play();
}

function soundExplosion (){
  var Audio = document.getElementById("explosion");
  Audio.play();
}


// Generate the board
function genBoard(gridSize) {
  for (var x = 0; x < gridSize; x++){
    for (var y = 0; y < gridSize; y++){
      board.cells.push ({row: x, col: y, isMine: true, hidden: true,})
    }
  }
}

// var board = {
//   cells: [ 
//     {row: 0, col: 0, isMine: "true", hidden: "true"}, 
//     {row: 0, col: 1, isMine: "true", hidden: "true"}, 
//     {row: 1, col: 0, isMine: "true", hidden: "true"}, 
//     {row: 1, col: 1, isMine: "true", hidden: "true"} 
//   ]
// }


// Start the game
function startGame () {
  genBoard(gridSize);
  document.addEventListener("click", soundClick, checkForWin)
  document.addEventListener("dblclick", soundClick, checkForWin)
   document.addEventListener('contextmenu', checkForWin)

  for (var x = 0; x < board.cells.length; x++){
    board.cells[x]["surroundingMines"] = countSurroundingMines(board.cells[x])
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var x = 0; x < board.cells.length; x++) 
  {
    if (board.cells[x].isMine === "false" && board.cells[x].hidden === "false"){
      return
    }
    if (board.cells[x].isMine === "false" && board.cells[x].hidden === "false"){
    return
  }
  lib.displayMessage('You win!');
  soundWin();
  }


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

// Check for surrounding mines
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var x = 0; x < surrounding.length; x++) {
    if (surrounding[x].isMine === "true") {
      count++
    }
  }
  return count;
}

// Restart the game

function gameReset() {
  document.getElementById('reset',location.reload())
}
