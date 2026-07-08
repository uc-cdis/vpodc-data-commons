import React, { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import AtlasDataDictionaryTable from './AtlasDataDictionaryTable';
import { dataDictionaryEndpoint } from '../../SharedUtils/Endpoints';
import { useRetrieveDDQuery } from '../addSlice';

const AtlasDataDictionaryLoading = () => { 
  const [TableData, setTableData] = useState([{}]);
  const endpoint = `${dataDictionaryEndpoint}/Retrieve`;

  /**
  async function safeParseJSON(response:any) {
    const body = await response.text();
    try {
      return JSON.parse(body);
    } catch (err) {
      return {
        status: response.status,
        response: JSON.stringify(response),
        error: err?.message,
      };
    }
  }

  useEffect(() => {//TODO replace api call
    fetch(endpoint)
      .then((response) => safeParseJSON(response))
      .then((data) => {
        setTableData(data);
        setIsLoading(false);
      });
  }, [endpoint]);
   */
  // TODO start here where should the API endpoint be going? is this a backend servace? can ask Pieter Lukasse he set this up originallly
  const { data, isLoading, isError } = useRetrieveDDQuery();

  console.log('data', data);

  const TableDataIsValid = typeof TableData === 'object'
   && 'total' in TableData
   && 'data' in TableData;

  if (!isLoading && !TableDataIsValid) {
    // eslint-disable-next-line
    console.error(TableData);
    return (
      <h3 className='data-not-available' data-testid='data-not-available'>
        Data Not Available
      </h3>
    );
  }
  return (
    <React.Fragment>
      {isLoading && (
        <div className='loading-container' data-testid='loading'>
          <Loader />
          <br />
            Loading...
        </div>
      )}
      {/*!isLoading && TableDataIsValid && (
        <AtlasDataDictionaryTable data-testid='atlas-data-dictionary-table' TableData={TableData} /> off for testign
      )*/}
    </React.Fragment>
  );
};

export default AtlasDataDictionaryLoading;
