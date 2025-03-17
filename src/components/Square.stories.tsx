import type { Meta, StoryObj } from '@storybook/react';
import Square from './Square';

const meta = {
  title: 'Components/Square',
  component: Square,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '50px', height: '50px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

// 空のマス
export const Empty: Story = {
  args: {
    value: null,
    isWinningSquare: false,
    onClick: () => console.log('clicked'),
  },
};

// 黒石
export const Black: Story = {
  args: {
    value: '●',
    isWinningSquare: false,
    onClick: () => console.log('clicked'),
  },
};

// 白石
export const White: Story = {
  args: {
    value: '○',
    isWinningSquare: false,
    onClick: () => console.log('clicked'),
  },
};

// 勝利マス（黒）
export const WinningBlack: Story = {
  args: {
    value: '●',
    isWinningSquare: true,
    onClick: () => console.log('clicked'),
  },
};

// 勝利マス（白）
export const WinningWhite: Story = {
  args: {
    value: '○',
    isWinningSquare: true,
    onClick: () => console.log('clicked'),
  },
};
