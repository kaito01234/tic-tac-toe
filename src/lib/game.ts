/**
 * ゲームの状態を表す型
 */
export type Player = 'X' | 'O' | null;
export type BoardState = (Player)[];
export type GameStatus = 'playing' | 'draw' | 'win';

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
    board: Array(9).fill(null),
    currentPlayer: 'X', // Xが先手
    winner: null,
    status: 'playing',
    winningLine: null,
  };
}

/**
 * 勝利条件のパターン
 */
const WINNING_PATTERNS = [
  [0, 1, 2], // 上段横
  [3, 4, 5], // 中段横
  [6, 7, 8], // 下段横
  [0, 3, 6], // 左列縦
  [1, 4, 7], // 中列縦
  [2, 5, 8], // 右列縦
  [0, 4, 8], // 左上から右下
  [2, 4, 6], // 右上から左下
];

/**
 * 勝者を判定
 */
export function checkWinner(board: BoardState): { winner: Player; winningLine: number[] | null } {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: pattern };
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
    currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
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
