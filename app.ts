const chessboard = document.getElementById("chessboard") as HTMLTableElement;
const output = document.getElementById("output") as HTMLParagraphElement;

// Define the possible moves of the knight
const moves: [number, number][] = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1]
];

// Function to get the knight's possible moves
function getMoves(row: number, col: number): [number, number][] {
  let result: [number, number][] = [];
  moves.forEach(move => {
    let r = row + move[0];
    let c = col + move[1];
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
      result.push([r, c]);
    }
  });
  return result;
}

// Highlight the cells where the knight can move
function highlightMoves(row: number, col: number) {
  let possibleMoves = getMoves(row, col);
  possibleMoves.forEach(move => {
    let id = `${String.fromCharCode(move[1] + 65)}${8 - move[0]}`;
    let cell = document.getElementById(id) as HTMLTableCellElement;
    cell.style.backgroundColor = "lightblue";
  });
  output.innerHTML = `The knight can move to cells: ${possibleMoves
    .map(move => `${String.fromCharCode(move[1] + 65)}${8 - move[0]}`)
    .join(", ")}`;
}

// Add click event to all cells
for (let i = 0; i < chessboard.rows.length; i++) {
  for (let j = 0; j < chessboard.rows[i].cells.length; j++) {
    const cell = chessboard.rows[i].cells[j] as HTMLTableCellElement;
    cell.addEventListener("click", function() {
      // Reset the background color of all cells
      for (let i = 0; i < chessboard.rows.length; i++) {
        for (let j = 0; j < chessboard.rows[i].cells.length; j++) {
          const cell = chessboard.rows[i].cells[j] as HTMLTableCellElement;
          cell.style.backgroundColor = "";
        }
      }

      // Change the background color of the clicked column
        this.style.backgroundColor = "black";

      // Highlight the possible moves of the knight
      highlightMoves(i, j);
    });
  }
}
