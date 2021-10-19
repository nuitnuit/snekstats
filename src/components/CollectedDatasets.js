import React from "react"
import Container from "react-bootstrap/Container";
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TableViewIcon from '@mui/icons-material/TableView';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import PublicIcon from '@mui/icons-material/Public';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveBar } from "@nivo/bar"

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// usage example:
/*
    var a = ['a', 1, 'a', 2, '1'];
    var unique = a.filter(onlyUnique);

    console.log(unique); // ['a', 1, 2, '1']
*/

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetNum: 1,
            datasetHeader: "Dataset 1",
            datasetAddr: "https://raw.githubusercontent.com/nuitnuit/snekstats/master/src/data/compiled_countries_d1.csv",
            dataViewNum: 1,
            renderItem: null
        };
        this.updateDataset = this.updateDataset.bind(this);
    }
    updateDataset(datasetNum) {
        this.setState(prevState => ({
            datasetHeader: "Dataset " + datasetNum,
            datasetNum: datasetNum
        }));
        switch (datasetNum) {
            case 1:
                this.setState({
                    datasetAddr: "https://raw.githubusercontent.com/nuitnuit/snekstats/master/src/data/compiled_countries_d1.csv"
                })
                break;
            case 2:
                this.setState({
                    datasetAddr: "https://raw.githubusercontent.com/nuitnuit/snekstats/master/src/data/cleanedNCD_d2.csv"
                })
                break;
            case 3:
                this.setState({
                    datasetAddr: ""
                })
                break;
            default:
                break;
        }
    }
    updateDataViewNum(dataViewNum) {
        this.setState(prevState => ({
            dataViewNum: dataViewNum
        }))
    }

    render() {
        return (
            <div className="CollectedDatasets" >
                <Container>
                    <br />
                    <div className="d-flex justify-content-center">
                        <h1>Welcome To SnekStats</h1>
                    </div>
                    <Row className="m-3">
                        <Col>
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button variant="primary">Selected dataset: </Button>
                                <Dropdown.Toggle variant="primary" id="dataset-dropdown-header">
                                    {this.state.datasetHeader}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.updateDataset(1)}>Dataset 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(2)}>Dataset 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="m-3">
                        <Col xs={1}>
                            <ToggleButtonGroup
                                orientation="vertical"
                                value={this.state.dataViewNum}
                                onChange={(event, value) => {
                                    if (value !== null)
                                        this.updateDataViewNum(value);
                                }}
                                exclusive
                            >
                                <ToggleButton value={1}>
                                    <TableViewIcon></TableViewIcon>
                                </ToggleButton>
                                <ToggleButton value={2}>
                                    <BarChartIcon></BarChartIcon>
                                </ToggleButton>
                                <ToggleButton value={3}>
                                    <PieChartIcon></PieChartIcon>
                                </ToggleButton>
                                <ToggleButton value={4}>
                                    <MultilineChartIcon></MultilineChartIcon>
                                </ToggleButton>
                                <ToggleButton value={5}>
                                    <PublicIcon></PublicIcon>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                        <Col xs={true} className="text-center align-self-center">
                            <StaticTable 
                                fetchAddr = {this.state.datasetAddr}
                                viewType = {this.state.dataViewNum}
                                isLoaded = {false}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CollectedDatasets;


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
            viewType: this.props.viewType,
            filteredData: null,
            filteredHeaders: null,
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
                var dataList = [];
                var headers, head, dataArray;
                if (this.props.staticData !== null) //done dont touch anymore
                {
                  
                    dataArray = data.split("\n")
                    headers = dataArray[0]
                    head = headers.split(",")
                    //console.log(data);
                    var keys = [], years = []; //keys here is countries
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
                            if (keys.includes(thing.Country) === false)
                            {
                                keys.push(thing.Country);
                            }
                            if (years.includes(thing.Year) === false)
                            {
                                years.push(thing.Year);
                            }
                            dataList.push(thing);
                        }
                    }
                    console.log(dataList);
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
                    this.setState((prevState) => ({
                        isLoaded: true,
                        finalData: dataList,
                        finalHeaders: headers,
                    }));
                    switch(this.props.viewType)
                    {
                        case 1: //data grid
                            this.setState({
                                renderItem: 
                                    <>
                                        <div style={{width: "100%"}}>
                                            <DataGrid 
                                                autoHeight 
                                                autoPageSize 
                                                pageSize={20} 
                                                rows={this.state.finalData}
                                                columns={this.state.finalHeaders}/>
                                        </div>
                                    </>
                                });
                            
                            break;
                        case 2: //bar chart

                        /*
                            {
                                "country": "AD",
                                "hot dog": 101,
                                "hot dogColor": "hsl(353, 70%, 50%)",
                                "burger": 165,
                                "burgerColor": "hsl(55, 70%, 50%)",
                                "sandwich": 169,
                                "sandwichColor": "hsl(321, 70%, 50%)",
                                "kebab": 53,
                                "kebabColor": "hsl(211, 70%, 50%)",
                                "fries": 134,
                                "friesColor": "hsl(327, 70%, 50%)",
                                "donut": 8,
                                "donutColor": "hsl(294, 70%, 50%)"
                            }
                        */  
                            const axisBottom = {
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: "Map",
                                legendPosition: "middle",
                                legendOffset: 32
                              };
                            const axisLeft = {
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: "Wins / Loss",
                                legendPosition: "middle",
                                legendOffset: -40
                            };
                            this.setState({
                                renderItem: 
                                <>
                                    <Col>
                                        <ResponsiveBar data={this.state.finalData}/>
                                    </Col>
                                    <Col xs={1}>
                                        <p>
                                            Should have a panel for filtering data here
                                        </p>
                                    </Col>
                                </>
                            });
                            break;
                    }
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
        console.log(this.props.viewType)
        console.log(this.state.viewType)
        if (this.state.currentAddr !== this.props.fetchAddr || this.state.viewType !== this.props.viewType)
        {
            this.setState({
                currentAddr: this.props.fetchAddr,
                isLoaded: false,
                viewType: this.props.viewType
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
                <>
                    <Row>
                        {this.state.renderItem}
                    </Row>
                </>
            );
        }
    }
}
