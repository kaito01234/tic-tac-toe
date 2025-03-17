'use client';

import { useState } from 'react';
import Board from '@/components/Board';
import { createInitialGameState, handleSquareClick, resetGame } from '@/lib/game';

export default function Home() {
  // ゲームの状態を管理
  const [gameState, setGameState] = useState(createInitialGameState());

  // マスをクリックしたときの処理
  const handleClick = (index: number) => {
    setGameState(prevState => handleSquareClick(prevState, index));
  };

  // ゲームをリセット
  const handleReset = () => {
    setGameState(resetGame());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <Board
          gameState={gameState}
          onSquareClick={handleClick}
          onReset={handleReset}
        />
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>五目並べ - Next.js + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}
