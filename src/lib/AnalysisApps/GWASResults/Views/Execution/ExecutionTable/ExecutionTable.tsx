import React, { useContext } from 'react';
import duration from '../../../Utils/duration'
import SharedContext from '../../../Utils/SharedContext';
import { Table } from '@mantine/core';

const ExecutionTable = () => {
  const { selectedRowData } = useContext(SharedContext);

  return (
    <div className='execution-table-container'>
      <Table className='execution-table' data-testid='execution-table'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User Given Name</Table.Th>
            <Table.Th>Workflow Given Name</Table.Th>
            <Table.Th>Start Time</Table.Th>
            <Table.Th>Run Duration</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {selectedRowData && (
            <Table.Tr key={selectedRowData.name}>
              <Table.Td>{selectedRowData.wf_name}</Table.Td>
              <Table.Td>{selectedRowData.name}</Table.Td>
              <Table.Td>{new Date(selectedRowData.startedAt).toLocaleString()}</Table.Td>
              <Table.Td>{duration(selectedRowData.startedAt, selectedRowData.finishedAt)}</Table.Td>
              <Table.Td>{selectedRowData.phase}</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default ExecutionTable;
