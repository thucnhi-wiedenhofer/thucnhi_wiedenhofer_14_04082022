import React from 'react';
import './table.css';

import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from 'react-table';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="table-utils row">
        <div className="show">
          <span>
            Show
            <select
              className="selective"
              value={state.pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            entries
          </span>
        </div>
        <div className="filter">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <table className="table table-hover" {...getTableProps()} border="1">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span className="grey">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span className="grey-blue"> ▼</span>
                      ) : (
                        <span className="grey-blue"> ▲</span>
                      )
                    ) : (
                      '  ▼'
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-utils">
        <div className="showing">
          <span>
            Showing 1 to {page.length} of {preGlobalFilteredRows.length} entries
          </span>
        </div>
        <div className="pagination">
          <button
            className="neutral"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'Previous'}
          </button>
          <span className="nav-page">
            <button className="btn-page">
              <strong>{state.pageIndex + 1}</strong>
            </button>
          </span>
          <button
            className="neutral"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'Next'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
