'use client';

import { useState, useEffect } from 'react';
import Board from '@/components/Board';
import GameSettings, { GameMode } from '@/components/GameSettings';
import { createInitialGameState, handleSquareClick, resetGame } from '@/lib/game';
import { getCpuMove, DifficultyLevel } from '@/lib/cpu';

export default function Home() {
  // ゲームの状態を管理
  const [gameState, setGameState] = useState(createInitialGameState());
  
  // ゲーム設定
  const [gameMode, setGameMode] = useState<GameMode>('human');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [playerColor, setPlayerColor] = useState<'●' | '○'>('●');
  
  // CPU思考中フラグ
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  
  // CPUの手番かどうかを判定
  const isCpuTurn = gameMode === 'cpu' && gameState.status === 'playing' && 
    ((playerColor === '●' && gameState.currentPlayer === '○') || 
     (playerColor === '○' && gameState.currentPlayer === '●'));
  
  // デバッグ情報をコンソールに出力
  useEffect(() => {
    if (gameMode === 'cpu') {
      console.log('CPU戦モード:', {
        playerColor,
        currentPlayer: gameState.status === 'playing' ? gameState.currentPlayer : 'ゲーム終了',
        isCpuTurn,
        isCpuThinking,
        difficulty
      });
    }
  }, [gameMode, playerColor, gameState.currentPlayer, gameState.status, isCpuTurn, isCpuThinking, difficulty]);
  
  // CPUの手番の処理
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCpuTurn && !isCpuThinking) {
      console.log('CPUの手番を処理します');
      // CPU思考開始
      setIsCpuThinking(true);
      
      // 少し遅延を入れてCPUの思考時間を演出
      const thinkingTime = difficulty === 'easy' ? 500 : 
                          difficulty === 'medium' ? 1000 : 1500;
      
      timer = setTimeout(() => {
        try {
          console.log('CPUが手を選択中...');
          const cpuMove = getCpuMove(gameState, difficulty);
          console.log('CPUの選択した手:', cpuMove);
          
          if (cpuMove !== null) {
            setGameState(prevState => handleSquareClick(prevState, cpuMove));
          } else {
            console.warn('CPUが有効な手を選択できませんでした');
          }
        } catch (error) {
          console.error('CPUの手の処理中にエラーが発生しました:', error);
        } finally {
          setIsCpuThinking(false);
        }
      }, thinkingTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameState, isCpuTurn, isCpuThinking, difficulty, playerColor, gameMode]);
  
  // マスをクリックしたときの処理
  const handleClick = (index: number) => {
    // CPU思考中またはCPUの手番の場合はクリックを無視
    if (isCpuThinking || isCpuTurn) return;
    
    // CPU戦の場合、プレイヤーの石の色が現在の手番と一致するかチェック
    if (gameMode === 'cpu') {
      if ((playerColor === '●' && gameState.currentPlayer === '○') || 
          (playerColor === '○' && gameState.currentPlayer === '●')) {
        return; // プレイヤーの手番ではない
      }
    }
    
    setGameState(prevState => handleSquareClick(prevState, index));
  };

  // ゲームをリセット
  const handleReset = () => {
    setGameState(resetGame());
    setIsCpuThinking(false);
  };
  
  // ゲームモードを変更
  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    handleReset();
  };
  
  // 難易度を変更
  const handleDifficultyChange = (level: DifficultyLevel) => {
    setDifficulty(level);
  };
  
  // プレイヤーの石の色を変更
  const handlePlayerColorChange = (color: '●' | '○') => {
    setPlayerColor(color);
    handleReset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <GameSettings
          gameMode={gameMode}
          difficulty={difficulty}
          playerColor={playerColor}
          onGameModeChange={handleGameModeChange}
          onDifficultyChange={handleDifficultyChange}
          onPlayerColorChange={handlePlayerColorChange}
        />
        
        <div className={isCpuThinking ? 'opacity-70 pointer-events-none' : ''}>
          <Board
            gameState={gameState}
            onSquareClick={handleClick}
            onReset={handleReset}
          />
        </div>
        
        {isCpuThinking && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">CPUが考え中...</p>
            <div className="mt-2 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>五目並べ - Next.js + TypeScript + Tailwind CSS</p>
      </footer>
    </div>
  );
}
