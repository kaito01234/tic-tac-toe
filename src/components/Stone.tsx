import React from 'react';
import { Player } from '@/lib/game';

interface StoneProps {
  player: Player;
  isWinning: boolean;
}

const Stone: React.FC<StoneProps> = ({ player, isWinning }) => {
  if (!player) return null;

  // 黒石（●）
  if (player === '●') {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        className={`drop-shadow-md ${isWinning ? 'animate-pulse' : ''}`}
      >
        <defs>
          <radialGradient id="blackStoneGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#666" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>
        <circle
          cx="10"
          cy="10"
          r="9"
          fill="url(#blackStoneGradient)"
          stroke={isWinning ? "#4ade80" : "none"}
          strokeWidth={isWinning ? "2" : "0"}
        />
        <circle cx="7" cy="7" r="2" fill="rgba(255, 255, 255, 0.2)" />
      </svg>
    );
  }

  // 白石（○）
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      className={`drop-shadow-md ${isWinning ? 'animate-pulse' : ''}`}
    >
      <defs>
        <radialGradient id="whiteStoneGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ddd" />
        </radialGradient>
      </defs>
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="url(#whiteStoneGradient)"
        stroke={isWinning ? "#4ade80" : "#999"}
        strokeWidth={isWinning ? "2" : "0.5"}
      />
      <circle cx="7" cy="7" r="1.5" fill="rgba(255, 255, 255, 0.8)" />
    </svg>
  );
};

export default Stone;
