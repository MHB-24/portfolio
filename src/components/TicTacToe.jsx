import { useState, useCallback } from 'react';
import styles from './TicTacToe.module.css';

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function minimax(board, isMax) {
  const winner = checkWinner(board);
  if (winner === 'O') return 10;
  if (winner === 'X') return -10;
  if (board.every(Boolean)) return 0;

  const scores = board.map((cell, i) => {
    if (cell) return isMax ? -Infinity : Infinity;
    const next = [...board];
    next[i] = isMax ? 'O' : 'X';
    return minimax(next, !isMax);
  });

  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function pcMove(board) {
  let best = -Infinity, move = -1;
  board.forEach((cell, i) => {
    if (cell) return;
    const next = [...board];
    next[i] = 'O';
    const score = minimax(next, false);
    if (score > best) { best = score; move = i; }
  });
  return move;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState(null); // 'win'|'lose'|'draw'

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setResult(null);
  }, []);

  const handleClick = useCallback((i) => {
    if (board[i] || gameOver) return;

    const next = [...board];
    next[i] = 'X';

    const winner = checkWinner(next);
    if (winner) { setBoard(next); setResult('win'); setGameOver(true); return; }
    if (next.every(Boolean)) { setBoard(next); setResult('draw'); setGameOver(true); return; }

    const pc = pcMove(next);
    next[pc] = 'O';

    const winner2 = checkWinner(next);
    if (winner2) { setBoard(next); setResult('lose'); setGameOver(true); return; }
    if (next.every(Boolean)) { setBoard(next); setResult('draw'); setGameOver(true); return; }

    setBoard(next);
  }, [board, gameOver]);

  const resultText = result === 'win' ? 'You win 🎉' : result === 'lose' ? 'You lose 😔' : result === 'draw' ? 'Draw 🤝' : null;

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>X = You &nbsp;·&nbsp; O = PC</p>
      <div className={styles.grid}>
        {board.map((cell, i) => (
          <button
            key={i}
            className={`${styles.cell} ${cell === 'X' ? styles.x : cell === 'O' ? styles.o : ''}`}
            onClick={() => handleClick(i)}
            aria-label={`Cell ${i + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
      {resultText && <p className={styles.result}>{resultText}</p>}
      <button className={styles.reset} onClick={reset}>Reset</button>
    </div>
  );
}
