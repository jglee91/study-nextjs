type Player = 'X' | 'O' | 'BOTH' | null;

function Square({ value, onClick, winner }: { winner: Player; onClick: () => void; value: Player }) {
  if (!value) {
    return <button className="square" onClick={onClick} disabled={Boolean(winner)} />;
  }

  return (
    <button className={`square square_${value.toLocaleLowerCase()}`} disabled>
      {value}
    </button>
  );
}

export default Square;
