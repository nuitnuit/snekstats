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
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Tooltip } from "@mui/material";
import StaticVisuals from "./StaticVisuals";
import { withSnackbar } from 'notistack';

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetNum: 1,
            datasetHeader: "Dataset 1",
            datasetAddr: "https://raw.githubusercontent.com/nuitnuit/snekstats/master/src/data/compiled_countries_d1.csv",
            dataViewNum: 2,
            renderItem: null
        };
        this.updateDataset = this.updateDataset.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    }

    alertUser = () => {

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
    callForceUpdate = () => {
        this.forceUpdate()
        console.log("forced")
    }
    render() {
        return (
            <div className="CollectedDatasets" >
                <Container fluid="xl" style = {{minHeight:"100vh"}}>
                    <br />
                    <div className="d-flex justify-content-center">
                        <h1>Collected datasets</h1>
                    </div>
                    <Row className="xl">
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
                    <Row style={{ minWidth: "0px" }}>
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
                                <Tooltip title="Table" placement="left">
                                    <ToggleButton value={1}>
                                        <TableViewIcon></TableViewIcon>
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Bar chart" placement="left">
                                    <ToggleButton value={2}>
                                        <BarChartIcon></BarChartIcon>
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Pie chart / Sunburst" placement="left">
                                    <ToggleButton value={3}>
                                        <PieChartIcon></PieChartIcon>
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Line chart" placement="left">
                                    <ToggleButton value={4}>
                                        <MultilineChartIcon></MultilineChartIcon>
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Choropleth" placement="left">
                                    <ToggleButton value={5}>
                                        <PublicIcon></PublicIcon>
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>
                        </Col>
                        <Col xs={true} className="text-center align-self-center">
                            <StaticVisuals
                                /*callForceUpdate={this.callForceUpdate}*/
                                fetchAddr={this.state.datasetAddr}
                                viewType={this.state.dataViewNum}
                                isLoaded={false}
                                datasetNum={this.state.datasetNum}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default CollectedDatasets;

