import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import { http, HttpResponse, delay } from 'msw';
import { GEN3_API, coreStore } from '@gen3/core';
import { Provider } from 'react-redux';
import TeamProjectModal from './TeamProjectModal';
import { TeamProject } from '../Utils/teamProjectHooks';


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
  status: 'success' as 'success'
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
  args: { ...successArgs, status: 'loading', data: null }
};

export const MockedLoadingTeamSelected: Story = {
  args: { ...successArgs, status: 'loading', data: null, selectedTeamProject: 'test' }
};

export const MockedError: Story = {
  args: { ...successArgs, status: 'error', data: null }
};

export const MockedNoTeams: Story = {
  args: { ...successArgs, data: [] }
};
