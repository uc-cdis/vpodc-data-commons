import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import TeamProjectModal from './TeamProjectModal';


import TeamProjectTestData from '../TestData/TeamProjectTestData';

const meta: Meta<typeof TeamProjectModal> = {
  title: 'SharedUtils/TeamProjectModal',
  component: TeamProjectModal,
  parameters: { // TODO remove this and fix accessibility
    a11y: {
      disable: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof TeamProjectModal>;



const successArgs = {
  isModalOpen: true,
  setIsModalOpen: (isModalOpen: boolean) => alert(`setIsModalOpen ${isModalOpen}`),
  setBannerText: () => null,
  data: TeamProjectTestData.data,
  status: 'success' as const,
};

  //data: TeamProject[] | null;

export const MockedSuccessNoTeamSelected: Story = {
  render: (args) => {
    const [selectedTeamProject, setSelectedTeamProject] = useState<string | null>(null);
    return <TeamProjectModal {...args} selectedTeamProject={selectedTeamProject} setSelectedTeamProject={setSelectedTeamProject}/>
  },
  args: { ...successArgs}
};

export const MockedSuccessTeamSelected: Story = {
  render: (args) => {
    const [selectedTeamProject, setSelectedTeamProject] = useState<string | null>(TeamProjectTestData.data[0].teamName);
    return <TeamProjectModal {...args} selectedTeamProject={selectedTeamProject} setSelectedTeamProject={setSelectedTeamProject}/>
  },
  args: {...successArgs}
};

export const MockedLoading: Story = {
  args: { ...successArgs, status: 'loading', data: null },
  play: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export const MockedLoadingTeamelected: Story = {
  args: { ...successArgs, status: 'loading', data: null, selectedTeamProject: 'test' }
};

export const MockedError: Story = {
  args: { ...successArgs, status: 'error', data: null }
};

export const MockedNoTeams: Story = {
  args: { ...successArgs, data: [] }
};
