import React from 'react';
import {
  NavPageLayout,
  NavPageLayoutProps,
  getNavPageLayoutPropsFromConfig, ProtectedContent,
} from '@gen3/frontend';
import { GetServerSideProps } from 'next';
import AtlasDataDictionaryContainer from '../lib/AnalysisApps/AtlasDataDictionary/AtlasDataDictionaryContainer';

const GWASADD= ({ headerProps, footerProps }: NavPageLayoutProps) => {

  return (
    <NavPageLayout
      {...{ headerProps, footerProps }}
      headerMetadata={{
        title: 'OMOP CDM Dictionary',
        content: 'Use this App to view a tabluar representation of the data dictionary',
        key: 'gen3-add',
      }}
    >
      <ProtectedContent>
        <div className="w-full p-10">
          <div className="w-full p-5">
            <AtlasDataDictionaryContainer />
          </div>
        </div>
      </ProtectedContent>
    </NavPageLayout>
  );
};

// TODO: replace this with a custom getServerSideProps function
export const getServerSideProps: GetServerSideProps<
  NavPageLayoutProps
> = async () => {
  return {
    props: {
      ...(await getNavPageLayoutPropsFromConfig()),
    },
  };
};

export default GWASADD;
