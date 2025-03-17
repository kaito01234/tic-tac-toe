/**
 * ゲームの状態を表す型
 */
export type Player = '●' | '○' | null;
export type BoardState = (Player)[];
export type GameStatus = 'playing' | 'draw' | 'win';

// ボードのサイズ定義
export const BOARD_SIZE = 15;
export const BOARD_CELLS = BOARD_SIZE * BOARD_SIZE;
export const WIN_COUNT = 5; // 勝利に必要な連続数

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winner: Player;
  status: GameStatus;
  winningLine: number[] | null;
}

/**
 * 初期ゲーム状態を作成
 */
export function createInitialGameState(): GameState {
  return {
    board: Array(BOARD_CELLS).fill(null),
    currentPlayer: '●', // 黒が先手
    winner: null,
    status: 'playing',
    winningLine: null,
  };
}

/**
 * 座標からインデックスを計算
 */
export function getIndex(row: number, col: number): number {
  return row * BOARD_SIZE + col;
}

/**
 * インデックスから座標を計算
 */
export function getCoordinates(index: number): { row: number; col: number } {
  return {
    row: Math.floor(index / BOARD_SIZE),
    col: index % BOARD_SIZE
  };
}

/**
 * 勝者を判定
 */
export function checkWinner(board: BoardState): { winner: Player; winningLine: number[] | null } {
  // 方向ベクトル: 右、下、右下、右上
  const directions = [
    { dr: 0, dc: 1 },  // 横
    { dr: 1, dc: 0 },  // 縦
    { dr: 1, dc: 1 },  // 右下斜め
    { dr: -1, dc: 1 }, // 右上斜め
  ];

  for (let index = 0; index < BOARD_CELLS; index++) {
    const player = board[index];
    if (!player) continue;

    const { row, col } = getCoordinates(index);

    // 各方向をチェック
    for (const { dr, dc } of directions) {
      const winningLine = [index];
      let count = 1;

      // 正方向にチェック
      for (let i = 1; i < WIN_COUNT; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        
        // ボード範囲外チェック
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) break;
        
        const nextIndex = getIndex(r, c);
        if (board[nextIndex] !== player) break;
        
        winningLine.push(nextIndex);
        count++;
      }

      // 逆方向にチェック
      for (let i = 1; i < WIN_COUNT; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        
        // ボード範囲外チェック
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) break;
        
        const nextIndex = getIndex(r, c);
        if (board[nextIndex] !== player) break;
        
        winningLine.push(nextIndex);
        count++;
      }

      // 勝利条件を満たしているかチェック
      if (count >= WIN_COUNT) {
        return { winner: player, winningLine };
      }
    }
  }

  return { winner: null, winningLine: null };
}

/**
 * ゲームが引き分けかどうかを判定
 */
export function checkDraw(board: BoardState): boolean {
  return board.every((square) => square !== null);
}

/**
 * マスをクリックしたときの処理
 */
export function handleSquareClick(gameState: GameState, index: number): GameState {
  // すでに終了している、または選択済みのマスの場合は何もしない
  if (gameState.status !== 'playing' || gameState.board[index] !== null) {
    return gameState;
  }

  // 新しいボード状態を作成
  const newBoard = [...gameState.board];
  newBoard[index] = gameState.currentPlayer;

  // 勝敗判定
  const { winner, winningLine } = checkWinner(newBoard);
  const isDraw = !winner && checkDraw(newBoard);

  // 新しいゲーム状態を返す
  return {
    board: newBoard,
    currentPlayer: gameState.currentPlayer === '●' ? '○' : '●',
    winner,
    status: winner ? 'win' : isDraw ? 'draw' : 'playing',
    winningLine,
  };
}

/**
 * ゲームをリセット
 */
export function resetGame(): GameState {
  return createInitialGameState();
}
