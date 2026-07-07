import { ISortConfig, IRowData } from '../Interfaces/Interfaces';

const DetermineNextSortDirection = (
  sortConfig: ISortConfig,
  sortKey: string | null,
) => {
  let direction: ISortConfig['direction'] = 'ascending';
  if (sortConfig.sortKey === sortKey) {
    if (sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.direction === 'descending') {
      direction = 'off';
    } else if (sortConfig.direction === 'off') {
      direction = 'ascending';
    }
  }
  return direction;
};

const SortDataWithDirection = (
  data: IRowData[],
  direction: ISortConfig['direction'],
  sortKey: keyof IRowData,
) => {
  /*const sortType = typeof data[0][sortKey];
  if (sortType !== 'number' && sortType !== 'string') {
    throw new Error(
      'Invalid sortType found in SortDataWithDirection',
    );
  }
  return [...data].sort((a, b) => {
    const aItem = a[sortKey] ?? -1;
    const bItem = b[sortKey] ?? -1;
    if (direction === 'ascending') {
      return sortType === 'string'
        ? aItem.toString().localeCompare(bItem.toString())
        : aItem - bItem;
    }
    if (direction === 'descending') {
      return sortType === 'string'
        ? bItem.toString().localeCompare(aItem.toString())
        : bItem - aItem;
    }
    return 0;
  });*/
  return data;
};

export { DetermineNextSortDirection, SortDataWithDirection };
