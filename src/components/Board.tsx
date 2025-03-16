import React from 'react';
import Square from './Square';
import { GameState } from '@/lib/game';

interface BoardProps {
  gameState: GameState;
  onSquareClick: (index: number) => void;
  onReset: () => void;
}

const Board: React.FC<BoardProps> = ({ gameState, onSquareClick, onReset }) => {
  const { board, currentPlayer, winner, status, winningLine } = gameState;

  // ステータスメッセージを生成
  const statusMessage = () => {
    if (status === 'win') {
      return `勝者: ${winner}`;
    } else if (status === 'draw') {
      return '引き分け';
    } else {
      return `次のプレイヤー: ${currentPlayer}`;
    }
  };

  // マス目がwinningLineに含まれているかチェック
  const isWinningSquare = (index: number) => {
    return winningLine !== null && winningLine.includes(index);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mb-4">◯✕ゲーム</h1>
      
      <div className="mb-4 text-xl font-semibold">
        {statusMessage()}
      </div>
      
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onSquareClick(index)}
            isWinningSquare={isWinningSquare(index)}
          />
        ))}
      </div>
      
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={onReset}
      >
        リセット
      </button>
    </div>
  );
};

export default Board;
