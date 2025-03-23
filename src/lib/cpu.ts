import { BoardState, GameState, BOARD_SIZE, BOARD_CELLS, getCoordinates, getIndex, checkWinner, WIN_COUNT } from './game';

/**
 * 難易度レベル
 */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/**
 * 空いているマスのインデックスを取得
 */
function getEmptySquares(board: BoardState): number[] {
  return board.reduce<number[]>((empty, cell, index) => {
    if (cell === null) empty.push(index);
    return empty;
  }, []);
}

/**
 * ランダムな手を選択（簡単レベル）
 */
function getRandomMove(board: BoardState): number | null {
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

/**
 * 勝利可能な手を探す（中級レベル）
 * 自分が勝てる手、または相手が勝てる手を防ぐ
 */
function findWinningOrBlockingMove(board: BoardState, cpuPlayer: '●' | '○'): number | null {
  const humanPlayer = cpuPlayer === '●' ? '○' : '●';
  const emptySquares = getEmptySquares(board);
  
  // 自分が勝てる手を探す
  for (const index of emptySquares) {
    const boardCopy = [...board];
    boardCopy[index] = cpuPlayer;
    const { winner } = checkWinner(boardCopy);
    if (winner === cpuPlayer) return index;
  }
  
  // 相手が勝てる手を防ぐ
  for (const index of emptySquares) {
    const boardCopy = [...board];
    boardCopy[index] = humanPlayer;
    const { winner } = checkWinner(boardCopy);
    if (winner === humanPlayer) return index;
  }
  
  return null;
}

/**
 * 評価関数（難しいレベル）
 * 各マスの価値を評価して最適な手を選択
 */
function evaluateBoard(board: BoardState, cpuPlayer: '●' | '○'): number[] {
  const humanPlayer = cpuPlayer === '●' ? '○' : '●';
  const scores = Array(BOARD_CELLS).fill(-1); // -1は置けないマスを示す
  const emptySquares = getEmptySquares(board);
  
  // 方向ベクトル: 右、下、右下、右上
  const directions = [
    { dr: 0, dc: 1 },  // 横
    { dr: 1, dc: 0 },  // 縦
    { dr: 1, dc: 1 },  // 右下斜め
    { dr: -1, dc: 1 }, // 右上斜め
  ];
  
  // 各空きマスを評価
  for (const index of emptySquares) {
    let score = 0;
    const { row, col } = getCoordinates(index);
    
    // 各方向をチェック
    for (const { dr, dc } of directions) {
      // CPUの連続した石の数
      score += evaluateDirection(board, row, col, dr, dc, cpuPlayer);
      // 人間の連続した石の数（ブロックの価値）
      score += evaluateDirection(board, row, col, dr, dc, humanPlayer) * 0.9; // 少し低い価値
    }
    
    // 中央付近に配置する価値を加算
    const centerRow = Math.floor(BOARD_SIZE / 2);
    const centerCol = Math.floor(BOARD_SIZE / 2);
    const distanceFromCenter = Math.abs(row - centerRow) + Math.abs(col - centerCol);
    score += Math.max(0, 10 - distanceFromCenter);
    
    scores[index] = score;
  }
  
  return scores;
}

/**
 * 特定の方向の石の連続を評価
 */
function evaluateDirection(board: BoardState, row: number, col: number, dr: number, dc: number, player: '●' | '○'): number {
  let score = 0;
  let ownCount = 0;
  let emptyCount = 0;
  let blocked = false;
  
  // 正方向にチェック
  for (let i = 1; i < WIN_COUNT; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    
    // ボード範囲外チェック
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) {
      blocked = true;
      break;
    }
    
    const cell = board[getIndex(r, c)];
    if (cell === player) {
      ownCount++;
    } else if (cell === null) {
      emptyCount++;
      break; // 空きマスがあれば、そこで連続は終わり
    } else {
      blocked = true;
      break;
    }
  }
  
  // 逆方向にチェック
  let blockedReverse = false;
  let ownCountReverse = 0;
  let emptyCountReverse = 0;
  
  for (let i = 1; i < WIN_COUNT; i++) {
    const r = row - dr * i;
    const c = col - dc * i;
    
    // ボード範囲外チェック
    if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) {
      blockedReverse = true;
      break;
    }
    
    const cell = board[getIndex(r, c)];
    if (cell === player) {
      ownCountReverse++;
    } else if (cell === null) {
      emptyCountReverse++;
      break; // 空きマスがあれば、そこで連続は終わり
    } else {
      blockedReverse = true;
      break;
    }
  }
  
  // 両方向の合計
  const totalOwn = ownCount + ownCountReverse;
  const totalEmpty = emptyCount + emptyCountReverse;
  const totalBlocked = blocked && blockedReverse;
  
  // スコア計算
  if (totalOwn >= WIN_COUNT - 1) {
    // 勝利に近い状態は非常に高い価値
    score += 1000;
  } else if (totalOwn >= WIN_COUNT - 2 && !totalBlocked) {
    // 勝利に近づく状態も高い価値
    score += 100;
  } else if (totalOwn > 0) {
    // 連続した石があれば価値あり
    score += Math.pow(10, totalOwn);
  }
  
  // 空きマスがあれば追加価値
  if (totalEmpty > 0 && !totalBlocked) {
    score += totalEmpty * 2;
  }
  
  return score;
}

/**
 * 最適な手を選択（難しいレベル）
 */
function getBestMove(board: BoardState, cpuPlayer: '●' | '○'): number | null {
  const scores = evaluateBoard(board, cpuPlayer);
  let bestScore = -1;
  let bestMoves: number[] = [];
  
  // 最高スコアの手を見つける
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > bestScore) {
      bestScore = scores[i];
      bestMoves = [i];
    } else if (scores[i] === bestScore) {
      bestMoves.push(i);
    }
  }
  
  if (bestMoves.length === 0) return null;
  
  // 同点の場合はランダムに選択
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

/**
 * CPUの手を取得
 */
export function getCpuMove(gameState: GameState, difficulty: DifficultyLevel): number | null {
  const { board, currentPlayer } = gameState;
  
  // ゲームが終了している場合は何もしない
  if (gameState.status !== 'playing') {
    return null;
  }
  
  // 空きマスがない場合は何もしない
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) {
    return null;
  }
  
  // 最初の手は中央付近に配置
  if (board.every(cell => cell === null)) {
    const centerRow = Math.floor(BOARD_SIZE / 2);
    const centerCol = Math.floor(BOARD_SIZE / 2);
    return getIndex(centerRow, centerCol);
  }
  
  try {
    switch (difficulty) {
      case 'easy':
        return getRandomMove(board);
        
      case 'medium': {
        // 勝利可能な手または防御の手を探す
        const strategicMove = findWinningOrBlockingMove(board, currentPlayer as '●' | '○');
        if (strategicMove !== null) return strategicMove;
        
        // なければランダムな手
        return getRandomMove(board);
      }
        
      case 'hard': {
        // 勝利可能な手または防御の手を探す
        const strategicMove = findWinningOrBlockingMove(board, currentPlayer as '●' | '○');
        if (strategicMove !== null) return strategicMove;
        
        // 最適な手を評価して選択
        const bestMove = getBestMove(board, currentPlayer as '●' | '○');
        if (bestMove !== null) return bestMove;
        
        // 最後の手段としてランダムな手
        return getRandomMove(board);
      }
        
      default:
        return getRandomMove(board);
    }
  } catch (error) {
    console.error('CPUの思考中にエラーが発生しました:', error);
    // エラーが発生した場合はランダムな手を返す
    return getRandomMove(board);
  }
}
