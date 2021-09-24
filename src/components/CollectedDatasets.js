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
import { StaticTable } from './StaticTable';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TableViewIcon from '@mui/icons-material/TableView';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import PublicIcon from '@mui/icons-material/Public';

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetNum: 1,
            datasetHeader: "Dataset 1",
            datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv",
            dataViewNum: 1,
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
                    <Row xs="auto">
                        <Col>
                            <Dropdown as={ButtonGroup} size="lg">
                                <Button variant="success">Selected dataset: </Button>
                                <Dropdown.Toggle variant="success" id="dataset-dropdown-header">
                                    {this.state.datasetHeader}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.updateDataset(1)}>Dataset 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(2)}>Dataset 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                        <Col>
                            <StaticTable
                                fetchAddr={this.state.datasetAddr}
                                viewType={this.state.dataViewNum}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
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