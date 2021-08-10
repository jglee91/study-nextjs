import { useEffect, useState } from 'react';
import Square from '../components/Square';

type Player = 'X' | 'O' | 'BOTH' | null;

function calculateWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  }

  function setSquareValue(index: number) {
    const newData = squares.map((square, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return square;
    });
    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  useEffect(() => {
    const w = calculateWinner(squares);

    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner('BOTH');
    }
  });

  return (
    <div className="wrapper">
      {!winner && <p>Hey {currentPlayer}, it&apos;s your turn</p>}
      {winner && winner !== 'BOTH' && <p>Congratulations {winner}</p>}
      {winner && winner === 'BOTH' && <p>Congratulations you&apos;re both winners</p>}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square key={i} winner={winner} onClick={() => setSquareValue(i)} value={squares[i]} />
          ))}
      </div>
      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
}

export default Board;