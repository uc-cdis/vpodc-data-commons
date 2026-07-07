import React from 'react';
import { Table } from '@mantine/core';

interface IEntriesHeaderProps {
  start: Number;
  stop: Number;
  total: Number;
}
const EntriesHeader = ({
  start,
  stop,
  total,
}: IEntriesHeaderProps) => {
  const stopLimitedToTotal = stop > total ? total.toLocaleString() : stop.toLocaleString();
  return (
    <Table.Caption
      className='entries-header'
      data-testid='entries-header'
    >
      Showing <strong>{start.toLocaleString()}</strong> to
      <strong> {stopLimitedToTotal}</strong> of
      <strong> {total.toLocaleString()}</strong> entries
    </Table.Caption>
  );
};

export default EntriesHeader;
