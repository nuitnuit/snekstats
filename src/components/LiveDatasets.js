import React from "react"
import '../App.css';
import { LiveTable } from "./LiveTable"
import tableIcon from "../assets/table.png";
import graphIcon from "../assets/graph.png";
import piechartIcon from "../assets/piechart.png";
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'

class LiveDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetHeader: "Live Dataset 1",
            datasetAddr: "/api/NCD_BMI_30A"
        };
        this.updateDataset = this.updateDataset.bind(this);
    }
    updateDataset(datasetNum) {
        this.setState(prevState => ({ datasetHeader: "Live Dataset " + datasetNum }));
        switch (datasetNum) {
            case 1:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_30A"
                })
            case 2:
                this.setState({
                    datasetAddr: "/api/NCD_BMI_30C"
                })
        }
    }
    render() {
        return (
            <div className="CollectedDatasets">
                <Container>
                    <br />
                    <h1>Chosen live dataset</h1>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dataset-dropdown-header">
                            {this.state.datasetHeader}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.updateDataset(1)}>Live Dataset 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.updateDataset(2)}>Live Dataset 2</Dropdown.Item>
                            {
                                /*<Dropdown.Item onClick={() => this.updateDataset(3)}>Dataset 3</Dropdown.Item>*/
                                /*For when we want to add new dataset*/
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary"><img src={tableIcon} width="50" height="50"></img></Button>
                        <Button variant="secondary"><img src={graphIcon} width="50" height="50"></img></Button>
                        <Button variant="secondary"><img src={piechartIcon} width="50" height="50"></img></Button>
                    </ButtonGroup>
                    &nbsp;
                    <LiveTable fetchAddr={this.state.datasetAddr} />
                    {
                        console.log(this.state.datasetAddr)
                    }
                </Container>
            </div>
        );
    }

}

export default LiveDatasets;