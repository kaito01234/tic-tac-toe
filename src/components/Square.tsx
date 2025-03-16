import React from 'react';
import { Player } from '@/lib/game';

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`
        w-full h-full aspect-square
        flex items-center justify-center
        text-4xl font-bold
        border border-gray-300 dark:border-gray-700
        transition-colors
        ${isWinningSquare ? 'bg-green-200 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}
        hover:bg-gray-100 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      onClick={onClick}
      aria-label={value ? `${value}が置かれています` : 'マス目'}
    >
      {value}
    </button>
  );
};

export default Square;
