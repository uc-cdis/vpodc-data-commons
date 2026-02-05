import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import TeamProjectModal from './TeamProjectModal';


import TeamProjectTestData from '../TestData/TeamProjectTestData';

const meta: Meta<typeof TeamProjectModal> = {
  title: 'SharedUtils/TeamProjectModal',
  component: TeamProjectModal,
};
export default meta;

type Story = StoryObj<typeof TeamProjectModal>;



const successArgs = {
  isModalOpen: true,
  setIsModalOpen: (isModalOpen: boolean) => alert(`setIsModalOpen ${isModalOpen}`),
  setBannerText: () => null,
  data: TeamProjectTestData.data,
  status: 'success' as const,
  selectedTeamProject: null,
  setSelectedTeamProject: () => null,
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
  render: (args) => {
    const [selectedTeamProject, setSelectedTeamProject] = useState<string | null>(null);
    return <TeamProjectModal {...args} selectedTeamProject={selectedTeamProject} setSelectedTeamProject={setSelectedTeamProject}/>
  },
  args: { ...successArgs, status: 'loading', data: null }
};

export const MockedLoadingTeamSelected: Story = {
  render: (args) => {
    const [selectedTeamProject, setSelectedTeamProject] = useState<string | null>('test');
    return <TeamProjectModal {...args} selectedTeamProject={selectedTeamProject} setSelectedTeamProject={setSelectedTeamProject}/>
  },
  args: { ...successArgs, status: 'loading', data: null }
};

export const MockedError: Story = {
  render: (args) => {
    return <TeamProjectModal {...args} />
  },
  args: { ...successArgs, status: 'error', data: null }
};

export const MockedNoTeams: Story = {
  render: (args) => {
    return <TeamProjectModal {...args} />
  },
  args: { ...successArgs, data: [] }
};
