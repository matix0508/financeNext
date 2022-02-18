/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { useTable } from "react-table";
import { IExpense } from "../../types/IExpense";

import styles from '../../styles/Table.module.scss';

interface ITable {
  rawData: IExpense[];
}

interface IColumn {
  Header: string;
  accessor: string;
}

function getColumn(name: string) {
  const output = {
    Header: name,
    accessor: name.toLowerCase(),
  };
  return output;
}

function getColumns() {
  return ["Name", "Category", "Cost", "Merchant", "Date"];
}

export const Table: FC<ITable> = ({ rawData }) => {
  const columns = React.useMemo(
    () => getColumns().map(c => getColumn(c)),
    []
  )

  const data = React.useMemo(() => rawData, [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<any>({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table className={styles.table} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};
