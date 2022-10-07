const X_CLASS = "x";
const CIRCLE_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const initMessageElement = document.getElementById("nameScreen");
const initButton = document.getElementById("initButton");
const headerText = document.getElementById("headerText");
const nameInput = document.getElementById("nameInput");
const resiSmiling = document.getElementById("resiSmiling");
const resiLaughing = document.getElementById("resiLaughing");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let arrayBoard = ["", "", "", "", "", "", "", "", ""];
let circleTurn;
let name;

restartGame();

restartButton.addEventListener("click", restartGame);
initButton.addEventListener("click", startGame);

function startGame() {
  initMessageElement.classList.remove("show");
  name = nameInput.value;
  headerText.innerText = `Resi vs ${name}!`;
}

function restartGame() {
  circleTurn = false;
  arrayBoard = ["", "", "", "", "", "", "", "", ""];
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  resiSmiling.classList.remove("show");
  resiLaughing.classList.remove("show");
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  if (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))
    return;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  addToArrayBoard(cell, currentClass);
  placeMark(cell, currentClass);
  if (checkWin(currentClass, arrayBoard)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    handleMinimaxTurn();
  }
}

function handleMinimaxTurn() {
  const bestMove = minimax(arrayBoard, 8, true);
  const cellIndex = bestMove.index;
  const cell = cellElements[cellIndex];
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  addToArrayBoard(cell, currentClass);
  placeMark(cell, currentClass);
  if (checkWin(currentClass, arrayBoard)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function minimax(board, depth, isMaximizing) {
  if (checkWin(CIRCLE_CLASS, board)) {
    return { score: 10 }; // AI wins
  } else if (checkWin(X_CLASS, board)) {
    return { score: -10 }; // AI loses
  } else if (board.filter((cell) => cell === "").length === 0) {
    return { score: 0 }; // Tie
  }

  if (depth === 0) return { score: 0 }; // Tie

  if (isMaximizing) {
    const bestMove = { score: -10000 };
    board.forEach((value, index) => {
      if (value === "") {
        // If spot is available
        const newBoard = [...board];
        newBoard[index] = CIRCLE_CLASS; // Make the move
        const move = minimax(newBoard, depth - 1, false);
        if (move.score > bestMove.score) {
          bestMove.score = move.score;
          bestMove.index = index;
        }
      }
    });
    return bestMove;
  } else {
    const bestMove = { score: 10000 };
    board.forEach((value, index) => {
      if (value === "") {
        // If spot is available
        const newBoard = [...board];
        newBoard[index] = X_CLASS; // Make the move
        const move = minimax(newBoard, depth - 1, true);        
        if (move.score < bestMove.score) {
          bestMove.score = move.score;
          bestMove.index = index;
        }
      }
    });
    return bestMove;
  }
}

function addToArrayBoard(cell, currentClass) {
  const cellNumber = parseInt(cell.getAttribute("data-cell-number"));
  arrayBoard[cellNumber] = currentClass;
}

function endGame(draw) {
  if (draw) {
    resiSmiling.classList.add("show");
    winningMessageTextElement.innerText = "Empate, quizás a la próxima ";
  } else {
    if (circleTurn) {
      resiLaughing.classList.add("show");
      winningMessageTextElement.innerText = "jajaja perdiste 🤣";
    } else {
      winningMessageTextElement.innerText = "Como ha pasado esto? 😭 ";
    }
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return arrayBoard.filter((cell) => cell === "").length === 0;
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass, board) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return board[index] === currentClass;
    });
  });
}
