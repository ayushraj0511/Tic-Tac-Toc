const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();
