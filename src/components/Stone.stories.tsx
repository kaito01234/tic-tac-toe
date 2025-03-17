import type { Meta, StoryObj } from '@storybook/react';
import Stone from './Stone';

const meta = {
  title: 'Components/Stone',
  component: Stone,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stone>;

export default meta;
type Story = StoryObj<typeof meta>;

// 黒石
export const Black: Story = {
  args: {
    player: '●',
    isWinning: false,
  },
};

// 白石
export const White: Story = {
  args: {
    player: '○',
    isWinning: false,
  },
};

// 勝利時の黒石
export const WinningBlack: Story = {
  args: {
    player: '●',
    isWinning: true,
  },
};

// 勝利時の白石
export const WinningWhite: Story = {
  args: {
    player: '○',
    isWinning: true,
  },
};
