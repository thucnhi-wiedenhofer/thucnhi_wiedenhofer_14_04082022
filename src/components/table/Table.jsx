import React from 'react';
import './table.css';
//Install and use react-table library and hooks
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from 'react-table';

/* Define a default UI for filtering
create a search bar component to filter datas in table */
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
      {/* Pagination */}
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
          {/* render the GlobalFilter component to make search input */}
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      {/* Apply the table props */}
      <table
        className="table table-secondary table-striped table-hover"
        {...getTableProps()}
        border="1"
      >
        <thead>
          {/* Loop over the header rows */}
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator when user click on a column header*/}
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
        {/* Apply table body  props*/}
        <tbody {...getTableBodyProps()}>
          {/* Prepare the row for display*/}
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    //render the cell contents
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="table-utils">
        <div className="showing">
          <span>
            Showing 1 to {page.length} of {preGlobalFilteredRows.length} entries
          </span>
        </div>
        <div className="pagination">
          <button
            className="btn btn-secondary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'Previous'}
          </button>
          <button className="btn btn-warning">
            <strong>{state.pageIndex + 1}</strong>
          </button>
          <button
            className="btn btn-secondary"
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
