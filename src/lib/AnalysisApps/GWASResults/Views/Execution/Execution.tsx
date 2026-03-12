import React, { useContext } from 'react';
import { Loader } from '@mantine/core';
import SharedContext from '../../Utils/SharedContext';
import ExecutionTable from './ExecutionTable/ExecutionTable';
import PHASES from '../../Utils/PhasesEnumeration';
import DetailPageHeader from '../../Components/DetailPageHeader/DetailPageHeader';
import LoadingErrorMessage from '../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';


import { useGetWorkflowLogsQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

const Execution = () => {
  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;

  const {data, error, isLoading, isFetching  } = useGetWorkflowLogsQuery({ workflowName: name, workflowUid: uid });

  if (isLoading || isFetching) {
    return (
      <React.Fragment>
        <DetailPageHeader pageTitle={'Execution Details'} />
        <div className='spinner-container'>
          <Loader />
        </div>
      </React.Fragment>
    );
  }
  if (error) {
    return (
      <React.Fragment>
        <DetailPageHeader pageTitle={'Execution Details'} />
        <LoadingErrorMessage />
      </React.Fragment>
    );
  }
  if (!data) {
    return (
      <React.Fragment>
        <DetailPageHeader pageTitle={'Execution Details'} />
        <LoadingErrorMessage message='No data retrieved from API'/>
      </React.Fragment>
    );
  }

  const determineDataLengthZeroOutput = (phase: string) => {
    if (
      phase === PHASES.Succeeded
      || phase === PHASES.Pending
      || phase === PHASES.Running
    ) {
      return <strong>Workflow {phase}</strong>;
    } if (phase === PHASES.Error) {
      return <strong>Workflow Errored without Error Data</strong>;
    } if (phase === PHASES.Failed) {
      return <strong>Workflow Failed without Error Data</strong>;
    }
    return <strong>Issue with workflow phase and no data returned</strong>;
  };

  const determineEmptyErrorMessage = (errorInterpreted: string) => {
    if (
      errorInterpreted === ''
    ) {
      return (
        <span>
        Step failed with an uncategorized error. Please contact us with any questions on how you may solve this issue.
        </span>
      );
    }
    return errorInterpreted;
  };

  return (
    <React.Fragment>
      <DetailPageHeader pageTitle={'Execution Details'} />
      <ExecutionTable />
      <div className='execution-data'>
        <h2>Logs</h2>
        {Array.isArray(data) ?
         ((data.length === 0) 
          ? (
            <React.Fragment>
              <p>{determineDataLengthZeroOutput(selectedRowData?.phase)}</p>
            </React.Fragment>
          ): data.length > 0
          && data.map((item) => (
            <React.Fragment key={item?.name}>
              <p>
                <strong>
                Step Name: <span>{item?.step_name}</span>
                </strong>
                <br />
                template: <span>{item?.step_template}</span>
                <br />
                error message: <span>{determineEmptyErrorMessage(item?.error_interpreted)}</span>
              </p>
              <br />
            </React.Fragment>
        ))): (data.error && (
          <p>
            <strong>Returned Data contains error message: </strong>
            <br />
            {JSON.stringify(data)}
          </p>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Execution;
