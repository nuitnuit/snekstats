import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

class StaticTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      rows: [],
      paginationCount: 5
    }
    this.render()
    {
      return (
        <div style={{ height: 400, width: '100%' }}>

          <DataGrid
            rows={this.state.rows}
            columns={this.state.headers}
            pageSize={this.state.paginationCount}
            rowsPerPageOptions={this.state.paginationCount}
            checkboxSelection
          />
        </div>
      );
    }
  }
}

export { StaticTableComponent };

/*//import { appendFileSync } from 'fs';
import React from 'react';
//import { deflateSync } from 'zlib';
//import {useTable} from 'react-table'
//import MOCK_DATA from './MOCK_DATA.json'
//import {COLUMNS} from './columns'
//import './table.css'
//import { DataGrid } from '@mui/x-data-grid';


async function getData(fetchAddr){
  const response = await fetch(fetchAddr)
  .then(response => response.text())
  .then(data => {
    var dataArray = data.split("\n")
    var headers = dataArray[0]
     var head = headers.split(",")
      var finalData = {};
      for(let i = 1; i < dataArray.length; i++)
      {
        var thing = {};
        for(let j = 0; j < head.length; j++)
        {
          var rowData = dataArray[i].split(",");
          if (rowData != '')
          {
            thing[head[j]] = rowData[j];
          }
        }
        finalData[i.toString()] = (thing);
      }
      console.log(finalData);
  })

  return response;
  }

  getData();
export const StaticTable= ()  => {

  // fetch("http://snekosnekstats.000webhostapp.com/data/women.csv")
  // .then(response => response)
  // .then(result => result)
  // .catch(err => console.log("err",err))

  // useEffect(() => {
  //   fetch("http://senkosnekstats.000webhost.com/data/women.csv") //women.csv must be in the public folder
  //   .then(response => response.json())
  //   .then(data => {
  //     (console.log(data));
  //   });
  // })

  //
  return (
    <p>
    temp
    </p>
  )
}

*/