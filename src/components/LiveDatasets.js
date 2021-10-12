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
import { LiveTable } from './LiveTable';
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TableViewIcon from '@mui/icons-material/TableView';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import PublicIcon from '@mui/icons-material/Public';
import LiveDatasetsFilter from '../components/LiveDatasetsFilter';

class LiveDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetNum: 1,
            datasetHeader: "Live Dataset 1",
            datasetAddr: "/api/NCD_BMI_30A",
            dataViewNum: 1,
        };
        this.updateDataset = this.updateDataset.bind(this);
    }
    updateDataset(datasetNum) {
        this.setState(prevState => ({
            datasetHeader: "Live Dataset " + datasetNum,
            datasetNum: datasetNum
        }));
        switch (datasetNum) {
            case 1:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_30A"
                })
                break;
            case 2:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_30C"
                })
                break;
            case 3:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_PLUS1C"
                })
                break;
            case 4:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_PLUS2C"
                })
                break;
            case 5:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_MINUS2C"
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
                    datasetAddr: "/api/NCD_BMI_30A"
                })
                break;
            case 2:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_30C"
                })
                break;
            case 3:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_PLUS1C"
                })
                break;
            case 4:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_PLUS2C"
                })
                break;
            case 5:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_MINUS2C"
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
                                <Button variant="primary">Selected live dataset: </Button>
                                <Dropdown.Toggle variant="primary" id="dataset-dropdown-header">
                                    {this.state.datasetHeader}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.updateDataset(1)}>Live Dataset 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(2)}>Live Dataset 2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(3)}>Live Dataset 3</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(4)}>Live Dataset 4</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.updateDataset(5)}>Live Dataset 5</Dropdown.Item>
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
                            <LiveDatasetsFilter />
                            <LiveTable
                                fetchAddr={this.state.datasetAddr}
                                viewType={this.state.dataViewNum}
                                isLoaded={false}
                                dataSetNum={this.state.datasetNum}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LiveDatasets;
