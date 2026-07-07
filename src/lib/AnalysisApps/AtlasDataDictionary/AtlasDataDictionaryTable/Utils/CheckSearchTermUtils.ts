import { IRowData, IValueSummary } from '../Interfaces/Interfaces';

export const formatForSearchComparison = (searchTerm: string | number) => searchTerm.toString().toLowerCase().trim().replace(/[,%]/g, '');

export const checkIfCellContainsSearchTerm = (
  cellText: string | number | null | undefined | IValueSummary[],
  searchInputValue: string,
) => {
  const cellTextString = cellText?.toString() || '';
  const formattedSearchInputValue = formatForSearchComparison(searchInputValue);
  if (
    formattedSearchInputValue
    && cellTextString
    && formatForSearchComparison(cellTextString).includes(
      formattedSearchInputValue,
    )
  ) {
    return 'search-highlight';
  }
  return '';
};

export const checkIfChartContainsSearchTerm = (
  rowObject: IRowData,
  searchInputValue: string,
) => {
  if (!rowObject.valueSummary) {
    return '';
  }
  let searchTermFound = false;
  rowObject.valueSummary.forEach((arrObj: Object) => {
    Object.values(arrObj).forEach((arrObjVal: string | number) => {
      if (checkIfCellContainsSearchTerm(arrObjVal, searchInputValue)) {
        searchTermFound = true;
      }
    });
  });
  if (searchTermFound) {
    return 'search-highlight';
  }
  return '';
};
// type guard utility function
const isValidKey = <T extends object>(
  key: string | number | symbol, 
  obj: T
): key is keyof T => {
  return key in obj;
};

export const checkIfDetailTableContainsSearchTerm = (
  rowObject: IRowData,
  searchInputValue: string,
) => {
  let searchTermFound = false;
  const hiddenKeys = ['minValue', 'maxValue', 'meanValue', 'standardDeviation'];
  hiddenKeys.forEach((keyString) => {
    if (isValidKey(keyString, rowObject) && checkIfCellContainsSearchTerm(rowObject[keyString], searchInputValue)) {
      searchTermFound = true;
    }
  });
  if (searchTermFound) return 'search-highlight';
  return '';
};

export const checkIfHiddenCellsContainSearchTerm = (
  rowObject: IRowData,
  searchInputValue: string,
) => {
  if (checkIfDetailTableContainsSearchTerm(rowObject, searchInputValue)) {
    return 'search-highlight';
  }
  if (checkIfChartContainsSearchTerm(rowObject, searchInputValue)) {
    return 'search-highlight';
  }
  return '';
};
