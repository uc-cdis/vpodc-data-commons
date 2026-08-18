import React, { useReducer } from 'react';
import { Title, Group, Button } from '@mantine/core';
import TeamProjectHeader from '../SharedUtils/TeamProject/TeamProjectHeader/TeamProjectHeader';
import AtlasDataDictionaryLoading from './AtlasDataDictionaryTable/AtlasDataDictionaryLoading';
import SelectSource from '../PLP/Steps/SelectSource/SelectSource';
import reducer, { State } from './Utils/reducer';


const InitializeCurrentState = (): State => ({
  currentStep: 0,
  sourceId: null,
  selectedTeamProject: localStorage.getItem('teamProject') || '',
});



const AtlasDataDictionaryContainer = () => {
  const [state, dispatch] = useReducer(reducer, InitializeCurrentState());

  const generateStep = () => {
    if (state.sourceId && state.currentStep === 1) {
      return (
        <div className='atlas-data-dictionary-container'>
          <AtlasDataDictionaryLoading sourceid={state.sourceId} />
        </div>
      );
    }

    return (
      <SelectSource
        team={state.selectedTeamProject}
        selectedSourceId={state.sourceId}
        dispatch={dispatch}
      />
    );
  }
  

  return (
    <React.Fragment>
      <div>
        <div className="flex justify-between pb-4">
          <Title order={1}>Data Dictionary</Title>
          <TeamProjectHeader isEditable={false} />
        </div>
      </div>
      <div data-testid="GWASApp" className="p-4">
        <div className="steps-wrapper">
          <div className="steps-content">
            <Group justify={'center'}>{generateStep()}</Group>
          </div>
          <div
            className="flex justify-between w-full"
            data-testid="steps-action"
          >
            <Button
              onClick={() => {
                dispatch({ type: 'decrementCurrentStep' });
              }}
              disabled={state.currentStep < 1}
            >
              Previous
            </Button>
            {/* If user is on the last step, do not show the next button */}
            {state.currentStep === 0 && (
              <Button
                onClick={() => {
                  dispatch({ type: 'incrementCurrentStep' });
                }}
                disabled={!state.sourceId}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AtlasDataDictionaryContainer;
