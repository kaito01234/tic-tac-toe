import React from 'react';
import { Player } from '@/lib/game';
import Stone from './Stone';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`
        w-8 h-8
        flex items-center justify-center
        transition-colors
        rounded-full
        ${isWinningSquare ? 'bg-green-100/20 dark:bg-green-900/20' : ''}
        hover:bg-amber-200/30 dark:hover:bg-amber-800/30
        focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-0
      `}
      onClick={onClick}
      aria-label={value ? `${value}が置かれています` : '交点'}
    >
      <Stone player={value} isWinning={isWinningSquare} />
    </button>
  );
};

export default Square;
