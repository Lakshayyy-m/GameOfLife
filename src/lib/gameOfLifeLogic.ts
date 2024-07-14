const countNeighbours = (
  board: number[][],
  row: number,
  column: number
): number => {
  let neighbors = 0;
  for (let i = row - 1; i < row + 2; i++) {
    for (let j = column - 1; j < column + 2; j++) {
      if (
        (i === row && j === column) ||
        i < 0 ||
        i >= board.length ||
        j < 0 ||
        j >= board[0].length
      ) {
        continue;
      }
      if (board[i][j] === 1 || board[i][j] === 3) {
        neighbors++;
      }
    }
  }
  return neighbors;
};

export const gameOfLifeLogic = (board: number[][]) => {
  /* 
    0 -> 1 exactly 3 neighbors
    1 -> 1 either 2 or 3 neighbors
    start | end | map
    0     | 0   | 0
    1     | 0   | 1
    0     | 1   | 2
    1     | 1   | 3
  */

  const row = board.length;
  const col = board[0].length;

  for (let i = 0; i < row; i++) {
    let neighbors = 0;
    for (let j = 0; j < col; j++) {
      neighbors = countNeighbours(board, i, j);
      if (board[i][j]) {
        if (neighbors === 2 || neighbors === 3) {
          board[i][j] = 3;
        }
      } else if (neighbors === 3) {
        board[i][j] = 2;
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j]) {
        if (board[i][j] === 1) {
          board[i][j] = 0;
        } else {
          board[i][j] = 1;
        }
      }
    }
  }

  return board;
};

export const generateRandom = (board: number[][], probability: number) => {
  let random = Math.random();
  const row = board.length;
  const col = board[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      random = Math.random();
      if (random < probability) {
        board[i][j] = 1;
      }
    }
  }

  return board;
};
