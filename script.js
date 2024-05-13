document.addEventListener('DOMContentLoaded', () => {
  const cellElements = document.querySelectorAll('[data-cell]');
  const board = document.querySelector('.board');
  const status = document.querySelector('.status');
  const restartButton = document.querySelector('.restart-btn');

  const X_CLASS = 'x';
  const O_CLASS = 'o';
  let currentPlayer = X_CLASS;
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  startGame();

  restartButton.addEventListener('click', startGame);

  function startGame() {
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    status.innerText = "Player X's turn";
  }

  function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }

  function endGame(draw) {
    if (draw) {
      status.innerText = 'Draw!';
    } else {
      status.innerText = `${currentPlayer === X_CLASS ? "Player X" : "Player O"} wins!`;
    }
    cellElements.forEach(cell => {
      cell.removeEventListener('click', handleClick);
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    status.innerText = `${currentPlayer === X_CLASS ? "Player X's turn" : "Player O's turn"}`;
  }

  function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayer === X_CLASS ? X_CLASS : O_CLASS);
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }

  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
  }
});
