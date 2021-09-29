import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { StaticTableComponent } from './tableComponent';

import '../css/staticTable.css'

 class StaticTable extends React.Component{
   
   constructor(props)
   {
     super(props);
     this.state = {
       fetchAddr: this.props.fetchAddr,
       staticData: this.props.staticData,
       viewType: this.props.viewType,
       isLoaded: false,
       finalData: null,
       error: null,
       renderItem: null,
      }
    }
    componentDidMount()
    {
      if (this.state.fetchAddr !== null)
      {
        fetch(this.state.fetchAddr)
        .then(response => response.text())
        .then((data) => 
        {
          var finalData = {};
          var headers, head, dataArray;
          console.log("dataset changed");
          if (this.state.staticData === true)
          {
            dataArray = data.split("\n")   
            headers = dataArray[0]
            head = headers.split(",")
            console.log(head);
            for(let i = 1; i < dataArray.length; i++)
            {
              var thing = {};
              for(let j = 0; j < head.length; j++)
              {
                var rowData = dataArray[i].split(",");
                if (rowData !== '')
                {
                  thing[head[j]] = rowData[j];
                }
              }
              finalData[i] = thing;
              console.log(finalData);
            }
            this.setState({
              isLoaded: true,
              finalData: finalData,
              renderItem: <StaticTableComponent rows={this.state.finalData} headers={head}/>
            })
            console.log(head);
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
    
    render()
    {
      const { error, isLoaded } = this.state;
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
          this.state.renderItem
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