import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {useTable} from 'react-table'
import {csv} from 'd3';


const COLUMNS = [
  {
    Headers:'Year',
    accessor: 'Year'
  },
  {
    Headers:'Percent',
    accessor:'%'
  }
]

function StaticTable() {

  const [data, setData] = useState([] )
  useEffect(() => {
    csv('/women.csv') //women.csv must be in the public folder
    .then(data => {
      setData(data);
      //(console.log(data));
    });
  },[])

  console.log(data)

  const columns = useMemo(() => COLUMNS, [])
  const tempdata = useMemo(()=> data, [])

  const tableInstance = useTable({
    columns: COLUMNS,
    data: data
  })

  const{
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
   
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup)=>
        <tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map((column)=>(
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))
          }

        </tr>)}        
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

export default StaticTable;