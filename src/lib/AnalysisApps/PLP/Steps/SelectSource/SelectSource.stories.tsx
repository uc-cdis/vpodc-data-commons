import React, { useReducer, Reducer } from 'react';
import reducer, {State, Action} from '../../Utils/StateManagement/reducer';
import InitializeCurrentState from '../../Utils/StateManagement/InitializeCurrentState';
import SelectSource from './SelectSource';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { SourcesEndpoint } from '@/lib/AnalysisApps/SharedUtils/Endpoints';
import { http, HttpResponse } from 'msw';

const meta: Meta<typeof SelectSource> = {
  title: 'PLP/SelectSource',
  component: SelectSource,
};

export default meta;
type Story = StoryObj<typeof SelectSource>;

const SelectSourceWithHooks = () => {
  const [state, dispatch] = useReducer(reducer, InitializeCurrentState());

  return (
    <SelectSource
      selectedSourceId={state.sourceId}
      dispatch={dispatch}
     />
  );
};
const TestSourcesData = {
  sources: [
    {
      source_id: 0,
      source_name: 'test 0'
    },
    {
      source_id: 1,
      source_name: 'test 1'
    },
    {
      source_id: 2,
      source_name: 'test 2'
    }
  ]
}

export const SelectSourceMockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(SourcesEndpoint, async () => {
          return HttpResponse.json(TestSourcesData);
        }),
      ]
      }},
  render: () => <SelectSourceWithHooks />, // see https://storybook.js.org/docs/writing-stories
};
