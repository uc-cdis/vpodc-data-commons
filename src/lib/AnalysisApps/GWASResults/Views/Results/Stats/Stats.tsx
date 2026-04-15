import React, { useContext, useState } from 'react';
import useSWR from 'swr';
import { Loader, Button, Tooltip } from '@mantine/core';
import SharedContext from '../../../Utils/SharedContext';
import { fetchPresignedUrlForWorkflowArtifact } from '../../../Utils/gwasWorkflowApi';
import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { useGetPresignedUrlOrDataForWorkflowArtifactQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

interface ResultsPngProps {
  artifactName: string;
}
//TODO update to stats
const Stats: React.FC<ResultsPngProps> = ({ artifactName }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;


  const { data, error, isLoading, isFetching} = useGetPresignedUrlOrDataForWorkflowArtifactQuery({artifactName, workflowName: name, workflowUid: uid, retrieveData: true });

  console.log('test 203', artifactName, data);

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

  if (!data?.url) {
    return (
      <LoadingErrorMessage message='Failed to load image, no image path' />
    );
  }


  return (
    <div className='results-view'>
      <section className='data-viz'>

      </section>
    </div>
  );
};

export default Stats;
