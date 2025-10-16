import React from 'react';
import GWASResultsContainer from './GWASResultsContainer';

import { Meta, StoryObj } from '@storybook/nextjs';


const meta: Meta<typeof GWASResultsContainer> = {
  title: 'Results',
  component: GWASResultsContainer,
  parameters: { // TODO remove this and fix accessibility
    a11y: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GWASResultsContainer>;


export const Mock: Story = {
  render: () => <GWASResultsContainer />,
};
