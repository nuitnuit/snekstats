import React, { useMemo } from 'react';
import {useTable} from 'react-table'
import CSV_DATA from '../data/CSV_DATA.json'
import '../css/staticTable.css'

const COLUMNS = [
  {
      Headers:'Country',
      accessor: 'Country'
    },
    {
      Headers:'Year',
      accessor:'Year'
    },
    {
      Headers:'Value',
      accessor: 'Value'
    },
    {
      Headers:'Gender',
      accessor: 'Gender'
    },
]


export const StaticTable= ()  => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(()=> CSV_DATA, [])
  
    const tableInstance = useTable({
      columns,
      data
    })
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance
     
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup)=>(
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column)=>(
                <th {...column.getHeaderProps()}>{column.render('Headers')}</th>
              ))}
          </tr>
          ))}        
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row)=>{
            prepareRow(row)
            return(
              <tr {...row.getRowProps()}>
                {row.cells.map((cell)=>{
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
  
             </tr>
            )
          })}
          
        </tbody>
      </table>
    );
  }