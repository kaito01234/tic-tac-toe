import React from 'react';
import Square from './Square';
import BoardGrid from './Board/BoardGrid';
import { GameState, BOARD_SIZE, getCoordinates } from '@/lib/game';

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

  // マス目を生成
  const renderCells = () => {
    const rows = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      const cells = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const index = row * BOARD_SIZE + col;
        cells.push(
          <div key={col} className="flex items-center justify-center">
            <Square
              value={board[index]}
              onClick={() => onSquareClick(index)}
              isWinningSquare={isWinningSquare(index)}
            />
          </div>
        );
      }
      rows.push(
        <div key={row} className="flex justify-between">
          {cells}
        </div>
      );
    }
    
    return rows;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mb-4">五目並べ</h1>
      
      <div className="mb-4 text-xl font-semibold flex items-center gap-2">
        <div className="w-6 h-6 flex items-center justify-center">
          {currentPlayer && (
            <div className={`${status === 'playing' ? 'animate-bounce' : ''}`}>
              {currentPlayer === '●' ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="white" stroke="black" strokeWidth="1" />
                </svg>
              )}
            </div>
          )}
        </div>
        {statusMessage()}
      </div>
      
      <div className="p-4 rounded-lg shadow-lg w-full max-w-[650px]">
        <div className="relative w-full aspect-square">
          {/* 盤面の背景 */}
          <div className="absolute inset-0 z-0">
            <BoardGrid />
          </div>
          
          {/* 交点のオーバーレイ */}
          <div className="absolute inset-0 z-10">
            {board.map((value, index) => {
              const { row, col } = getCoordinates(index);
              
              return (
                <div 
                  key={index} 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    top: `${row * 100 / (BOARD_SIZE - 1)}%`, 
                    left: `${col * 100 / (BOARD_SIZE - 1)}%`,
                    zIndex: value ? 20 : 10
                  }}
                >
                  <Square
                    value={value}
                    onClick={() => onSquareClick(index)}
                    isWinningSquare={isWinningSquare(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
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
