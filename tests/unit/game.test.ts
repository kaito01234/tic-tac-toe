import { describe, it, expect } from 'vitest';
import {
  createInitialGameState,
  handleSquareClick,
  checkWinner,
  checkDraw,
  BOARD_SIZE,
  BOARD_CELLS,
  WIN_COUNT,
  Player,
  BoardState,
} from '@/lib/game';

describe('ゲームロジック', () => {
  describe('createInitialGameState', () => {
    it('初期状態を正しく作成する', () => {
      const state = createInitialGameState();
      expect(state.board.length).toBe(BOARD_CELLS);
      expect(state.board.every(cell => cell === null)).toBe(true);
      expect(state.currentPlayer).toBe('●');
      expect(state.winner).toBeNull();
      expect(state.status).toBe('playing');
      expect(state.winningLine).toBeNull();
    });
  });

  describe('handleSquareClick', () => {
    it('空のマスをクリックすると石が置かれる', () => {
      const state = createInitialGameState();
      const newState = handleSquareClick(state, 0);
      
      expect(newState.board[0]).toBe('●');
      expect(newState.currentPlayer).toBe('○');
    });

    it('すでに石が置かれたマスをクリックしても何も変わらない', () => {
      let state = createInitialGameState();
      state = handleSquareClick(state, 0);
      const newState = handleSquareClick(state, 0);
      
      expect(newState).toEqual(state);
    });

    it('ゲームが終了した後はクリックしても何も変わらない', () => {
      let state = createInitialGameState();
      state.status = 'win';
      const newState = handleSquareClick(state, 0);
      
      expect(newState).toEqual(state);
    });
  });

  describe('checkWinner', () => {
    it('横に5つ並んだ場合は勝利', () => {
      const board: BoardState = Array(BOARD_CELLS).fill(null);
      const player: Player = '●';
      const row = 5;
      
      // 横に5つ並べる
      for (let i = 0; i < WIN_COUNT; i++) {
        board[row * BOARD_SIZE + i] = player;
      }
      
      const result = checkWinner(board);
      expect(result.winner).toBe(player);
      expect(result.winningLine?.length).toBe(WIN_COUNT);
    });

    it('縦に5つ並んだ場合は勝利', () => {
      const board: BoardState = Array(BOARD_CELLS).fill(null);
      const player: Player = '○';
      const col = 5;
      
      // 縦に5つ並べる
      for (let i = 0; i < WIN_COUNT; i++) {
        board[i * BOARD_SIZE + col] = player;
      }
      
      const result = checkWinner(board);
      expect(result.winner).toBe(player);
      expect(result.winningLine?.length).toBe(WIN_COUNT);
    });

    it('斜めに5つ並んだ場合は勝利', () => {
      const board: BoardState = Array(BOARD_CELLS).fill(null);
      const player: Player = '●';
      
      // 右下斜めに5つ並べる
      for (let i = 0; i < WIN_COUNT; i++) {
        board[i * BOARD_SIZE + i] = player;
      }
      
      const result = checkWinner(board);
      expect(result.winner).toBe(player);
      expect(result.winningLine?.length).toBe(WIN_COUNT);
    });

    it('勝者がいない場合はnullを返す', () => {
      const board: BoardState = Array(BOARD_CELLS).fill(null);
      const result = checkWinner(board);
      expect(result.winner).toBeNull();
      expect(result.winningLine).toBeNull();
    });
  });

  describe('checkDraw', () => {
    it('すべてのマスが埋まっている場合は引き分け', () => {
      const board: BoardState = Array(BOARD_CELLS).fill('●');
      expect(checkDraw(board)).toBe(true);
    });

    it('空のマスがある場合は引き分けではない', () => {
      const board: BoardState = Array(BOARD_CELLS).fill('●');
      board[0] = null;
      expect(checkDraw(board)).toBe(false);
    });
  });
});
