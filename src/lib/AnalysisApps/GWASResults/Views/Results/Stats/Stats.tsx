import React, { useContext } from 'react';
import { Loader } from '@mantine/core';
import SharedContext from '../../../Utils/SharedContext';
import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { useGetPresignedUrlOrDataForWorkflowArtifactQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';
import StatsTable from './StatsTable'

interface ResultsStatsProps {
  artifactName: string;
}

interface TableDataItem {
  evaluation: string;
  metric: string;
  value: string;
}

const Stats: React.FC<ResultsStatsProps> = ({ artifactName }) => {

  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;


  const { data, error, isLoading, isFetching} = useGetPresignedUrlOrDataForWorkflowArtifactQuery({artifactName, workflowName: name, workflowUid: uid, retrieveData: 'tsv'});



  if (error) {
    return (
      <LoadingErrorMessage message='Error getting stats' />
    );
  }
  if (isLoading || isFetching) {
    return (
      <div className='spinner-container'>
        Fetching stats... <Loader size="sm" />
      </div>
    );
  }

  if (!data) {
    return (
      <LoadingErrorMessage message='No data' />
    );
  }

  return (
    <div className='results-view'>
      <section className='data-viz'>
        <StatsTable data={data} />
      </section>
    </div>
  );
};

export default Stats;
