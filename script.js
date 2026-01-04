const submitBtn = document.getElementById("submit");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1, player2;
let currentPlayer;
let currentSymbol = "X";
let board = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) return;

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  currentPlayer = player1;
  message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWinner()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      cells.forEach(c => c.style.pointerEvents = "none");
      return;
    }

    currentSymbol = currentSymbol === "X" ? "O" : "X";
    currentPlayer = currentSymbol === "X" ? player1 : player2;
    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentSymbol)
  );
}
