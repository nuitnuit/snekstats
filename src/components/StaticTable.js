import React, { useMemo } from 'react';
import {useTable} from 'react-table'
import CSV_DATA from '../data/CSV_DATA.json'
//import {COLUMNS} from './columns'

import '../css/staticTable.css'

/*
const CSVdata = require('./csvToJson');
console.log(CSVdata.dataJson())
const MOCK_DATA = CSVdata.dataJson()
console.log(MOCK_DATA)
*/

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
  /*
   const [data, setData] = useState([] )
   useEffect(() => {
     csv('/women.csv') //women.csv must be in the public folder
     .then(data => {
       setData(data);
       (console.log(data));
     });
   },[])
  console.log(data)*/

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


