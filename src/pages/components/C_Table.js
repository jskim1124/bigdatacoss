import React, { useState, useMemo } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

function C_Table({ columns, data, onDelete }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value);
    setGlobalFilter(event.target.value);
  };

  return (
    <div className="w-full text-center">
      <input
        className="border p-2 w-full mb-2"
        name="filter"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Search..."
      />
      <div className="max-h-[520px] overflow-y-auto">
        <table className="w-full" {...getTableProps()}>
          <thead className="bg-gray-100 rounded border-b border-b-gray-500 sticky top-0">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="py-1.5" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
                <th>삭제</th>
              </tr>
            ))}
          </thead>
          <tbody 
          className="border-b"
          {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="py-2 whitespace-nowrap">
                      <div className="overflow-x-auto max-w-[180px]">
                        <div>{cell.render("Cell")}</div>
                      </div>
                    </td>
                  ))}
                  <td>
                    <button className="px-1 text-red-500 hover:text-red-700 hover:bg-red-400 hover:rounded-md hover:text-white" onClick={() => onDelete(row.original.id)}>삭제</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default C_Table;
