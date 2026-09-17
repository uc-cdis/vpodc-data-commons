import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Modal, TextInput, Button, Loader, Alert, Text } from '@mantine/core';
import ACTIONS from '../../Utils/StateManagement/Actions';
//import './JobInputModal.css';
import { SubmitWorkflowEndpoint, DefaultHeaders } from '@/lib/AnalysisApps/SharedUtils/Endpoints';
import { MdWarning } from "react-icons/md";

interface Props {
  jobName: string;
  dispatch: React.Dispatch<any>;
  selectedStudyPopulationCohort: cohort;
  datasetObservationWindow: number;
  selectedOutcomeCohort: cohort;
  outcomeObservationWindow: number;
  removeIndividualsWithPriorOutcome: boolean;
  selectedTeamProject: string;
  minimumCovariateOccurrence: number;
  percentageOfDataToUseAsTest: number;
  numberOfCrossValidationFolds: number;
  datasetRemainingSize: number | null;
  model: string;
  modelParameters: Record<string, any>;
  sourceId: number | null;
}

interface cohort { // TODO - centralize this interface
  cohort_definition_id: number;
  cohort_name: string;
  size: number;
}

const JobSubmitModal: React.FC<Props> = ({
  jobName,
  dispatch,
  selectedStudyPopulationCohort,
  datasetObservationWindow,
  selectedOutcomeCohort,
  outcomeObservationWindow,
  removeIndividualsWithPriorOutcome,
  selectedTeamProject,
  minimumCovariateOccurrence,
  percentageOfDataToUseAsTest,
  numberOfCrossValidationFolds,
  datasetRemainingSize,
  model,
  modelParameters,
  sourceId,
}) => {
  // const { data, status } = useQuery(
  //   ['monthly-workflow-limit-job-input-modal'],
  //   fetchMonthlyWorkflowLimitInfo,
  // );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<{
    type?: 'error' | 'warning',
    title: string, 
    body?: JSX.Element
  }| null>(null);
  const [jobNameError, setJobNameError] = useState(null as string | null);

  const isSubmitButtonDisabled =
    !!jobNameError 
    || isSubmitting
    || datasetRemainingSize === null; // Add additional checks here if needed
    // !workflowLimitInfoIsValid(data) ||
    // workFlowLimitExceeded;

  const datasetRemainingSizeErrorMessage = (type: 'error' | 'warning') => ({
      type: type,
      title: 'Submission is blocked, attrition table still calculating.', 
      body: (<>The <strong>Dataset size</strong>, <strong>Training set size</strong>, and <strong>Testing set size</strong> are not yet available. Please wait for the attrition table to finish before submitting.</>)
    });
  useEffect(() => {
      if (datasetRemainingSize === null) {
        setSubmitError(datasetRemainingSizeErrorMessage('warning'));
      }
  }, [datasetRemainingSize]);


  const handleEnterJobName = (jobName: string) => {
    // validate job name
    if (jobName === '') {
      setJobNameError('Job name cannot be empty.');
    } else if (!/^[\w\s.-]+$/.test(jobName)) {
      setJobNameError('Job name can only contain letters, numbers, spaces, underscores, hyphens, and dots.');
    } else {
      setJobNameError(null);
    }
    dispatch({
      type: ACTIONS.SET_JOB_NAME,
      payload: jobName,
    });
  };

  // Submit workflow request
  const handleSubmit = async () => {
    if (!datasetRemainingSize) {
      setSubmitError(datasetRemainingSizeErrorMessage('error'));
      return;
    }
    if (jobName === '') {
      handleEnterJobName(jobName);
      return; // do not submit if job name invalid
    }
    try {
      setIsSubmitting(true); // Start the submission process
      setSubmitError(null); // Reset any previous errors

      const requestBody = {
        dataset_id: selectedStudyPopulationCohort.cohort_definition_id,
        outcome_id: selectedOutcomeCohort.cohort_definition_id,
        dataset_observation_window: datasetObservationWindow,
        outcome_observation_window: outcomeObservationWindow,
        require_time_at_risk: false, // TODO - advanced option
        min_time_at_risk: 364,  // TODO - advanced option
        include_all_outcomes:  true, // TODO - advanced option
        first_exposure_only: false, // TODO - advanced option
        remove_subjects_with_prior_outcome: removeIndividualsWithPriorOutcome,
        source_id: sourceId,
        covariate_min_fraction: minimumCovariateOccurrence,
        test_fraction: percentageOfDataToUseAsTest/100,
        n_fold: numberOfCrossValidationFolds,
        dataset_size: datasetRemainingSize,
        training_set_size: datasetRemainingSize ? Math.round((100-percentageOfDataToUseAsTest)*datasetRemainingSize/100) : null,
        test_set_size: datasetRemainingSize ? calculateTestSetSize(percentageOfDataToUseAsTest, datasetRemainingSize) : null,
        template_version: "plp-template",
        workflow_name: jobName,
        team_project: selectedTeamProject,
        model_list: [
          {
            name: model,
            params: modelParameters[model]
          },
        ]
      };

      const response = await fetch(SubmitWorkflowEndpoint, {
        method: 'POST',
        headers: DefaultHeaders,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const extraErrorText = await response.text() as string | '';
        throw new Error(`Submission failed with status: ${response.status} - ${extraErrorText}`);
      }

      const responseData = await response.json();
      console.log('Submission Successful: ' + JSON.stringify(responseData));
      // Dispatch success-related actions
      dispatch({
        type: ACTIONS.SET_WORKFLOW_SUBMISSION_STATUS,
        payload: {status: 'success', response: responseData},
      });
      dispatch({ type: ACTIONS.HIDE_JOB_SUBMIT_MODAL });
    } catch (error: any) {
      setSubmitError({title: error.message || 'Something went wrong during submission.'});
      // Dispatch error-related actions
      dispatch({
        type: ACTIONS.SET_WORKFLOW_SUBMISSION_STATUS,
        payload: {status: 'error', response: error},
      });
      console.error('Error submitting workflow:', error);
    } finally {
      setIsSubmitting(false); // End the submission process
    }
  };

  const calculateTestSetSize = (percentageOfDataToUseAsTest: number, datasetRemainingSize: number) => {
    // round both test and training sizes and sum. If sum > datasetRemainingSize, then seet testSize = testSize -1.
    // This will happen in some cases, e.g. datasetRemainingSize = 114, and percentageOfDataToUseAsTest = 25
    // will result in rounded values of 86 and 29 = 115, which is then corrected by method below to 86 and 28.
    const trainingSize = Math.round((100-percentageOfDataToUseAsTest)*datasetRemainingSize/100);
    const testSize = Math.round((percentageOfDataToUseAsTest)*datasetRemainingSize/100);
    if (trainingSize+testSize > datasetRemainingSize) {
      return testSize-1;
    } else {
      return testSize;
    }
  };

  const WaitingBlock = (<Text fs="italic" c="dimmed"><Loader size={12}  color="dimmed"/> waiting for attrition table...</Text>);

  return (
    <Modal
      opened={true}
      onClose={() => {
        dispatch({ type: ACTIONS.HIDE_JOB_SUBMIT_MODAL });
      }}
      title='Review Details'
      closeButtonProps={{ 'aria-label': 'Close modal' }}
      overlayProps={{ opacity: 0.55, blur: 3 }}
      centered
      size='lg'
    >
      <TextInput
        className="gwas-job-name"
        label="Job Name"
        required
        placeholder="Enter Job Name"
        onChange={(e) => handleEnterJobName(e.target.value)}
        value={jobName}
        error={jobNameError}
      />
      <div className="flex-col">
        <div className="flex-row">
          <table className="table-auto w-full my-4">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Dataset:
                </td>
                <td className="align-top">
                  {selectedStudyPopulationCohort.cohort_name}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Dataset Observation Window:
                </td>
                <td className="align-top">
                  {datasetObservationWindow} days
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Outcome of Interest:
                </td>
                <td className="align-top">
                  {selectedOutcomeCohort.cohort_name}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Outcome Window:
                </td>
                <td className="align-top">
                  {outcomeObservationWindow} days
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Remove indiv. with prior outcome:
                </td>
                <td className="align-top">
                  {removeIndividualsWithPriorOutcome ? 'Yes' : 'No'}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Dataset size (after time window filters):
                </td>
                <td className="align-top">
                  {datasetRemainingSize !== null ? datasetRemainingSize : WaitingBlock}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Training set size:
                </td>
                <td className="align-top">
                  {datasetRemainingSize !== null ? `${Math.round((100-percentageOfDataToUseAsTest)*datasetRemainingSize/100)}` : WaitingBlock}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Testing set size:
                </td>
                <td className="align-top">
                  {datasetRemainingSize !== null ? `${calculateTestSetSize(percentageOfDataToUseAsTest, datasetRemainingSize)}` : WaitingBlock}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-right align-top whitespace-nowrap">
                  Cross-validation:
                </td>
                <td className="align-top">
                  {numberOfCrossValidationFolds} folds
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {submitError && (
          <Alert
            variant='light'
            color={submitError.type === 'warning' ? 'orange': 'red'}
            title={submitError.title}
            icon={<MdWarning />}
            className='my-4'
          >
            {submitError.body ? submitError.body : ''}
          </Alert>
        )}
      </div>
      <div className="flex-row">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitButtonDisabled}
          className="submit-button"
        >
          {isSubmitting ? <Loader color="white" size="sm" /> : 'Submit'}
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: ACTIONS.HIDE_JOB_SUBMIT_MODAL });
          }}
          className="back-button"
          variant="outline"
        >
          Back
        </Button>
      </div>
    </Modal>
  );
};

export default JobSubmitModal;
