import React from 'react';
import { BOARD_SIZE } from '@/lib/game';

interface BoardGridProps {
  className?: string;
}

const BoardGrid: React.FC<BoardGridProps> = ({ className = '' }) => {
  // 盤面のサイズ（SVGの座標系）
  const size = 100;
  const cellSize = size / (BOARD_SIZE - 1);
  const totalSize = size;

  // 格子線を生成
  const renderGridLines = () => {
    const lines = [];
    
    // 横線
    for (let i = 0; i < BOARD_SIZE; i++) {
      lines.push(
        <line
          key={`h-${i}`}
          x1={0}
          y1={i * cellSize}
          x2={size}
          y2={i * cellSize}
          stroke="#8B4513"
          strokeWidth="0.3"
        />
      );
    }
    
    // 縦線
    for (let i = 0; i < BOARD_SIZE; i++) {
      lines.push(
        <line
          key={`v-${i}`}
          x1={i * cellSize}
          y1={0}
          x2={i * cellSize}
          y2={size}
          stroke="#8B4513"
          strokeWidth="0.3"
        />
      );
    }
    
    return lines;
  };

  // 星（ほし）を描画
  const renderStarPoints = () => {
    const starPoints = [];
    const starPositions = [3, 7, 11]; // 星の位置（15x15の場合）
    
    for (const row of starPositions) {
      for (const col of starPositions) {
        const x = col * cellSize;
        const y = row * cellSize;
        starPoints.push(
          <circle
            key={`star-${row}-${col}`}
            cx={x}
            cy={y}
            r="0.8"
            fill="#8B4513"
          />
        );
      }
    }
    
    return starPoints;
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      className={`${className} overflow-visible`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 盤面の背景 */}
      <rect
        x="0"
        y="0"
        width={totalSize}
        height={totalSize}
        fill="#E6C88C"
        rx="1"
        ry="1"
      />
      
      {/* 木目調のテクスチャ */}
      <filter id="woodTexture">
        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="5" />
        <feDisplacementMap in="SourceGraphic" scale="1" />
      </filter>
      
      <rect
        x="0"
        y="0"
        width={totalSize}
        height={totalSize}
        fill="rgba(139, 69, 19, 0.05)"
        filter="url(#woodTexture)"
        rx="1"
        ry="1"
      />
      
      {/* 格子線 */}
      <g>{renderGridLines()}</g>
      
      {/* 星（ほし） */}
      <g>{renderStarPoints()}</g>
    </svg>
  );
};

export default BoardGrid;
