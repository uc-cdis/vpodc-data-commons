import React, { useContext, useState } from 'react';
import { Loader, Tooltip } from '@mantine/core';
import SharedContext from '../../../Utils/SharedContext';
import LoadingErrorMessage from '../../../../SharedUtils/LoadingErrorMessage/LoadingErrorMessage';
import { useGetPresignedUrlOrDataForWorkflowArtifactQuery } from '@/lib/AnalysisApps/Results/Utils/workflowApi';

interface ResultsPngProps {
  artifactName: string;
}

const ResultsPng: React.FC<ResultsPngProps> = ({ artifactName }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

  const { selectedRowData } = useContext(SharedContext);
  if (!selectedRowData) {
    throw new Error('selectedRowData is not defined in SharedContext');
  }
  const { name, uid } = selectedRowData;


  const { data, error, isLoading, isFetching} = useGetPresignedUrlOrDataForWorkflowArtifactQuery({artifactName, workflowName: name, workflowUid: uid });


  const isSafeImageSrc = (url: string) => {
    return (
      /^https?:\/\/.+/i.test(url) ||
      /^data:image\/(png|jpeg|gif|webp);base64,/.test(url)
    );
  };


  if (error || (data?.url && !isSafeImageSrc(data.url))) {
    return (
      <>
        <LoadingErrorMessage message='Error getting plot' />
      </>
    );
  }
  if (isLoading || isFetching) {
    return (
      <>
        <div className='spinner-container'>
          Fetching plot... <Loader size="sm" />
        </div>
      </>
    );
  }

  if (!data?.url) {
    return (
      <>
        <LoadingErrorMessage message='Failed to load image, no image path' />
      </>
    );
  }

  const displaySpinnerWhileImageLoadsOrErrorIfItFails = () => {
    if (imageLoadFailed) {
      return (
        <LoadingErrorMessage message='Failed to load image, invalid image path' />
      );
    }
    if (imageLoaded) {
      return null;
    }
    return (
      <div className='spinner-container'>
        Loading... <Loader size="sm" />
      </div>
    );
  };

  return (
    <div className='results-view'>
      <section className='data-viz'>
        {isSafeImageSrc(data.url) && !imageLoadFailed && (
          <Tooltip label='Click to open in tab. Right click and select “Save Image As” to download'>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                // snyk-code-ignore
                // reason: src attribute is validated by isSafeImageSrc; false positive for DOMXSS
                src={data.url}
                alt='Results plot'
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoadFailed(true)}
                className="h-auto max-h-screen p-4 rounded-lg bg-white object-contain"
              />
            </a>
          </Tooltip>
        )}
        {displaySpinnerWhileImageLoadsOrErrorIfItFails()}
      </section>
    </div>
  );
};

export default ResultsPng;
