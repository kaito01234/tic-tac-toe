import type { Meta, StoryObj } from '@storybook/react';
import Board from './Board';
import { createInitialGameState, GameState } from '@/lib/game';

const meta = {
  title: 'Components/Board',
  component: Board,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSquareClick: { action: 'clicked' },
    onReset: { action: 'reset' },
  },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

// 初期状態
export const Initial: Story = {
  args: {
    gameState: createInitialGameState(),
    onSquareClick: (index) => console.log('clicked', index),
    onReset: () => console.log('reset'),
  },
};

// プレイ中の状態
export const InProgress: Story = {
  args: {
    gameState: {
      ...createInitialGameState(),
      board: [
        '●', '○', null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, '●', null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, '○', null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, '●', null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
      ],
      currentPlayer: '○',
    },
    onSquareClick: (index) => console.log('clicked', index),
    onReset: () => console.log('reset'),
  },
};

// 勝利状態
export const Winner: Story = {
  args: {
    gameState: {
      ...createInitialGameState(),
      board: [
        '●', '○', null, null, null, null, null, null, null, null, null, null, null, null, null,
        '●', '○', null, null, null, null, null, null, null, null, null, null, null, null, null,
        '●', '○', null, null, null, null, null, null, null, null, null, null, null, null, null,
        '●', '○', null, null, null, null, null, null, null, null, null, null, null, null, null,
        '●', null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
      ],
      currentPlayer: '○',
      winner: '●',
      status: 'win',
      winningLine: [0, 15, 30, 45, 60],
    },
    onSquareClick: (index) => console.log('clicked', index),
    onReset: () => console.log('reset'),
  },
};

// 引き分け状態
export const Draw: Story = {
  args: {
    gameState: {
      ...createInitialGameState(),
      status: 'draw',
    },
    onSquareClick: (index) => console.log('clicked', index),
    onReset: () => console.log('reset'),
  },
};
