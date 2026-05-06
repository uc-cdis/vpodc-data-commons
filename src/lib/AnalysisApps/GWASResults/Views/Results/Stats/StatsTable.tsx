import React, { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';


interface TableDataItem {
  evaluation: string;
  metric: string;
  value: string;
}
interface ResultsStatsTableProps {
  data: TableDataItem[];
}

const Stats: React.FC<ResultsStatsTableProps> = ({ data }) => {

  const columns = useMemo<MRT_ColumnDef<TableDataItem>[]>(()=> [
    {
      accessorKey: 'evaluation',
      header: 'Evaluation',
    },
    {
      accessorKey: 'metric',
      header: 'Metric',
    },
    {
      accessorKey: 'value',
      header: 'Value',
    }
  ],[]);

  const table = useMantineReactTable({
    columns,
    data,
  });


  return (
    <div className='results-view'>
      <section className='data-viz'>
        <MantineReactTable table={table} />
      </section>
    </div>
  );
};

export default Stats;
