export interface Action {
  type: string;
  payload?: any;
};

export interface State {
  currentStep: number;
  selectedTeamProject: string;
  sourceId: number | null;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setSelectedSourceId':
      return { ...state, sourceId: action.payload };
    case 'decrementCurrentStep':
      return { ...state, currentStep: state.currentStep - 1 };
    case 'incrementCurrentStep':
      return { ...state, currentStep: state.currentStep + 1 };
    default:
      throw new Error(`Unknown action passed to reducer: ${action}`);
  }
};

export default reducer;
