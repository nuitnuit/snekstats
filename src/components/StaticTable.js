import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from "@mui/x-data-grid";

import '../css/staticTable.css'

class StaticTable extends React.Component{
  constructor(props)
  {
      super(props);
      this.state = {
          isLoaded: this.props.isLoaded,
          finalData: null,
          finalHeaders: null,
          error: null,
          renderItem: null,
          currentAddr: this.props.fetchAddr,
      }
      this.loadDatasets = this.loadDatasets.bind(this);
  }   

  loadDatasets()
  {
      if (this.props.fetchAddr !== null)
      {
          console.log("dataset changed");
          fetch(this.props.fetchAddr)
          .then(response => response.text())
          .then((data) => 
          {
              //console.log(data);
              var finalData = [];
              var headers, head, dataArray;
              if (this.props.staticData !== null) //done dont touch anymore
              {
                  
                  dataArray = data.split("\n")
                  headers = dataArray[0]
                  head = headers.split(",")
                  //console.log(data);
                  let i = 1, j = 0;
                  for(; i < dataArray.length; i++)
                  {
                      j = 0;
                      var rowData = dataArray[i].split(",");
                      if (rowData !== [] && rowData[j] !== "" && rowData[j] !== undefined)
                      {
                          var thing = {id: i,};
                          for(; j < head.length; j++)
                          {
                              thing[head[j]] = rowData[j].replace(/(\r\n|\n|\r)/gm, "");
                          }
                          finalData.push(thing);
                      }
                  }
                  headers = [{field: "id", headerName: "ID"}];
                  for (let i = 0; i < head.length; i++)
                  {
                      headers.push(
                      {   
                          field: head[i], 
                          headerName: head[i],
                          width: 200
                      }
                      );
                  }
                  this.setState({
                      isLoaded: true,
                      finalData: finalData,
                      finalHeaders: headers,
                  });
                  this.setState({
                      renderItem: <div style={{width: "100%"}}>
                          <DataGrid 
                              autoHeight 
                              autoPageSize 
                              pageSize={20} 
                              rows={this.state.finalData} 
                              columns={this.state.finalHeaders}/>
                      </div>
                  });
              }
          },
          (error) => {
              this.setState({
                  isLoaded: true,
                  error
              })
          })
      }
      else
      {
          this.setState({
              isLoaded: true,
              renderItem: <p>No datasets selected</p>
          })
      }
  }

  componentDidMount()
  {
      this.loadDatasets();
  }

  componentDidUpdate()
  {
      console.log(this.props.fetchAddr)
      console.log(this.state.currentAddr)
      if (this.state.currentAddr !== this.props.fetchAddr)
      {
          this.setState({
              currentAddr: this.props.fetchAddr,
              isLoaded: false
          })
          this.loadDatasets();
      }
  }
  
   
  render()
  {
      const { error, isLoaded, renderItem } = this.state;
      if (error) {
          return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
          return (
              <>
              <CircularProgress size={80} />
              <p>Loading dataset</p>
          </>
          );
      } else {
      return (
              renderItem
          );
      }
  }
}

  
  export {StaticTable};
  
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
      
      /*
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
    */