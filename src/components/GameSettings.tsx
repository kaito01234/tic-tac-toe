import React from 'react';
import { DifficultyLevel } from '@/lib/cpu';

export type GameMode = 'human' | 'cpu';

interface GameSettingsProps {
  gameMode: GameMode;
  difficulty: DifficultyLevel;
  playerColor: '●' | '○';
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (level: DifficultyLevel) => void;
  onPlayerColorChange: (color: '●' | '○') => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  gameMode,
  difficulty,
  playerColor,
  onGameModeChange,
  onDifficultyChange,
  onPlayerColorChange,
}) => {
  return (
    <div className="w-full max-w-[650px] mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ゲーム設定</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ゲームモード選択 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">対戦モード</label>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                gameMode === 'human'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => onGameModeChange('human')}
            >
              対人戦
            </button>
            <button
              className={`px-3 py-1 rounded ${
                gameMode === 'cpu'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => onGameModeChange('cpu')}
            >
              CPU戦
            </button>
          </div>
        </div>
        
        {/* 難易度選択（CPUモードの場合のみ表示） */}
        {gameMode === 'cpu' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">難易度</label>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded ${
                  difficulty === 'easy'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                onClick={() => onDifficultyChange('easy')}
              >
                簡単
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  difficulty === 'medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                onClick={() => onDifficultyChange('medium')}
              >
                普通
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  difficulty === 'hard'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
                onClick={() => onDifficultyChange('hard')}
              >
                難しい
              </button>
            </div>
          </div>
        )}
        
        {/* 石の色選択（CPUモードの場合のみ表示） */}
        {gameMode === 'cpu' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">あなたの石</label>
            <div className="flex space-x-4">
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  playerColor === '●'
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : ''
                }`}
                onClick={() => onPlayerColorChange('●')}
              >
                <svg width="24" height="24" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" fill="black" />
                </svg>
              </button>
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  playerColor === '○'
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : ''
                }`}
                onClick={() => onPlayerColorChange('○')}
              >
                <svg width="24" height="24" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" fill="white" stroke="black" strokeWidth="1" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSettings;
