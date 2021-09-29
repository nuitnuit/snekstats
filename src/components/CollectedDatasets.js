import React from "react"
import Container from "react-bootstrap/Container";
import '../App.css';
import tableIcon from "../assets/table.png";
import graphIcon from "../assets/graph.png";
import piechartIcon from "../assets/piechart.png";
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
import Line from "@nivo/line"
import { LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { CircularProgress } from "@mui/material";
import { StaticTableComponent } from "./tableComponent";
import { DataGrid } from "@mui/x-data-grid";

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetNum: 1,
            datasetHeader: "Dataset 1",
            datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv",
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
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv"
                })
                break;
            case 2:
                this.setState({
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/cleanedNCD_d2.csv"
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
        switch (dataViewNum) {
            case 1:
                this.setState({
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv"
                })
                break;
            case 2:
                this.setState({
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/cleanedNCD_d2.csv"
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

export default CollectedDatasets;

{/*<div className="row align-items-center my-5">
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary active">
            <input type="radio" name="viewType" id="option1" autocomplete="off" checked/> 
            <img src={tableIcon} width="50" height="50"></img>
        </label>
        <label className="btn btn-secondary">
            <input type="radio" name="viewType" id="option2" autocomplete="off"/>
            <img src={graphIcon} width="50" height="50"></img>
        </label>
        <label className="btn btn-secondary">
            <input type="radio" name="viewType" id="option2" autocomplete="off"/>
            <img src={piechartIcon} width="50" height="50"></img>
        </label>
    </div>
    <div className="col-md-12">
    </div>
</div>
<Col>
    <ButtonGroup aria-label="Basic example">
        
        <Button variant="secondary" active><img src={tableIcon} width="40" height="40"></img></Button>
        <Button variant="secondary"><img src={graphIcon} width="40" height="40"></img></Button>
        <Button variant="secondary"><img src={piechartIcon} width="40" height="40"></img></Button>
    </ButtonGroup>
</Col>
*/}