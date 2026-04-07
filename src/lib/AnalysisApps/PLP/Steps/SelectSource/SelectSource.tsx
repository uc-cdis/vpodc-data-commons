import React, { useEffect, useState } from 'react';
import ACTIONS from '../../Utils/StateManagement/Actions';

import { IconDatabaseOff } from '@tabler/icons-react';
import { Loader, Table, Pagination, Select } from '@mantine/core';
import { SourcesEndpoint } from '../../../SharedUtils/Endpoints';
import useSWR from 'swr';

type SelectSourceProps = {
  dispatch: (action: any) => void;
  selectedSourceId?: number | null;
};

interface source { 
  source_id: number;
  source_name: string;
}




const SelectSource = ({
  selectedSourceId,
  dispatch,
}: SelectSourceProps) => {
  const handleSourceSelect = (selectedSource: source) => {
    dispatch({
      type: ACTIONS.SET_SELECTED_SOURCE_ID,
      payload: selectedSource.source_id,
    });
  };

  const { data:sourcesFromFetch, error, isLoading } = useSWR(SourcesEndpoint,
    (...args) => fetch(...args).then((res) => res.json()).then((data) => {
      if (Array.isArray(data?.sources)) {
        return data.sources;
      } else {
        const message = `Data source recieved in an invalid format:
          ${JSON.stringify(data)}`;
        new Error(message);
      }
    }),
  );


  const [page, setPage] = useState(1); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows to show per page

  if (isLoading)
    return (
      <div className="flex justify-center pt-8 min-h-[300px]">
        <Loader size="lg" />
      </div>
    );

  if (error || !sourcesFromFetch)
    return <React.Fragment>Error getting data for table</React.Fragment>;

  const pageOfDisplayedSources = sourcesFromFetch.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
  const totalPagesForPagination = Math.ceil(sourcesFromFetch.length / rowsPerPage);
  return (
    <div data-tour="source-select">
      <React.Fragment>
        <div className="w-full min-h-[200px] py-5">
          {pageOfDisplayedSources?.length > 0 ? (
            <Table className="shadow">
              <Table.Thead className="bg-vadc-slate_blue font-light">
                <Table.Tr>
                  <Table.Th>Select</Table.Th>
                  <Table.Th>Source Name</Table.Th>
                  <Table.Th>Source ID</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pageOfDisplayedSources.map((source: source, i: number) => (
                  <Table.Tr
                    key={i}
                    className={i % 2 ? 'bg-vadc-alternate_row' : ''}
                  >
                    <Table.Td>
                      <input
                        type="radio"
                        id={`radio-buttion-${i}`}
                        checked={selectedSourceId === source.source_id}
                        onChange={() => {
                          handleSourceSelect(source);
                        }}
                      />
                      <label htmlFor={`radio-buttion-${i}`} className="sr-only">
                        Select this row
                      </label>
                    </Table.Td>
                    <Table.Td>{source.source_name}</Table.Td>
                    <Table.Td>{source.source_id}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div>
                <IconDatabaseOff />
              </div>
              <div>No Data</div>
            </div>
          )}
          <div
            data-testid="pagination-controls"
            className="flex justify-between w-full"
          >
            <Pagination
              className="pt-5 flex justify-end"
              value={page}
              onChange={setPage}
              total={totalPagesForPagination}
              color="blue"
              size="md"
              withEdges
            />
            <Select
              className="pt-5 pl-3 w-32"
              value={rowsPerPage.toString()}
              onChange={(value) => {
                setRowsPerPage(Number(value));
                setPage(1);
              }}
              size="sm"
              aria-label="pagination select"
              data={[
                { value: '10', label: '10 /page' },
                { value: '20', label: '20 /page' },
                { value: '50', label: '50 /page' },
                { value: '100', label: '100 /page' },
              ]}
            />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default SelectSource;
