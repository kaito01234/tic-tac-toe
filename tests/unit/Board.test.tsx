import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from '@/components/Board';
import { createInitialGameState, GameState } from '@/lib/game';

describe('Board コンポーネント', () => {
  it('初期状態で正しく表示される', () => {
    const gameState = createInitialGameState();
    const onSquareClick = vi.fn();
    const onReset = vi.fn();
    
    render(
      <Board
        gameState={gameState}
        onSquareClick={onSquareClick}
        onReset={onReset}
      />
    );
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('五目並べ')).toBeInTheDocument();
    
    // 次のプレイヤーが表示されていることを確認
    expect(screen.getByText(/次のプレイヤー: ●/)).toBeInTheDocument();
    
    // リセットボタンが表示されていることを確認
    expect(screen.getByRole('button', { name: 'リセット' })).toBeInTheDocument();
  });
  
  it('勝者がいる場合に勝者が表示される', () => {
    const gameState: GameState = {
      ...createInitialGameState(),
      winner: '●',
      status: 'win',
      winningLine: [0, 1, 2, 3, 4],
    };
    const onSquareClick = vi.fn();
    const onReset = vi.fn();
    
    render(
      <Board
        gameState={gameState}
        onSquareClick={onSquareClick}
        onReset={onReset}
      />
    );
    
    // 勝者が表示されていることを確認
    expect(screen.getByText('勝者: ●')).toBeInTheDocument();
  });
  
  it('引き分けの場合に引き分けが表示される', () => {
    const gameState: GameState = {
      ...createInitialGameState(),
      status: 'draw',
    };
    const onSquareClick = vi.fn();
    const onReset = vi.fn();
    
    render(
      <Board
        gameState={gameState}
        onSquareClick={onSquareClick}
        onReset={onReset}
      />
    );
    
    // 引き分けが表示されていることを確認
    expect(screen.getByText('引き分け')).toBeInTheDocument();
  });
  
  it('リセットボタンをクリックするとonResetが呼ばれる', () => {
    const gameState = createInitialGameState();
    const onSquareClick = vi.fn();
    const onReset = vi.fn();
    
    render(
      <Board
        gameState={gameState}
        onSquareClick={onSquareClick}
        onReset={onReset}
      />
    );
    
    // リセットボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: 'リセット' }));
    
    // onResetが呼ばれたことを確認
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
