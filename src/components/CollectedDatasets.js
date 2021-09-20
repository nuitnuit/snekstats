
import React from "react"
import Container from "react-bootstrap/Container";
import '../App.css';
import tableIcon from "../assets/table.png";
import graphIcon from "../assets/graph.png";
import piechartIcon from "../assets/piechart.png";
import women from "../data/women.csv";
import  { StaticTable }  from './StaticTable'
import Dropdown from 'react-bootstrap/Dropdown'
import { render } from "@testing-library/react";

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datasetHeader: "Select datasets"};
    this.setDatasetHeader = this.setDatasetHeader.bind(this);
    }
    setDatasetHeader(datasetNum) {
        this.setState(prevState => ({datasetHeader: datasetNum}));
    }
    render() {
        return (
            <div className="CollectedDatasets">
                <Container>
                    <br />
                    <div class="d-flex justify-content-center">
                        <h1>Welcome To SnekStats</h1>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dataset-dropdown-header">
                            {this.state.datasetHeader}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setDatasetHeader("Dataset 1")}>Dataset 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setDatasetHeader("Dataset 2")}>Dataset 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setDatasetHeader("Dataset 3")}>Dataset 3</Dropdown.Item>
                        </Dropdown.Menu>    
                    </Dropdown>
                    <div class="row align-items-center my-5">
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary active">
                                <input type="radio" name="viewType" id="option1" autocomplete="off" checked/> 
                                <img src={tableIcon} width="50" height="50"></img>
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio" name="viewType" id="option2" autocomplete="off"/>
                                <img src={graphIcon} width="50" height="50"></img>
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio" name="viewType" id="option2" autocomplete="off"/>
                                <img src={piechartIcon} width="50" height="50"></img>
                            </label>
                        </div>
                        <div class="col-md-12">
                            <StaticTable/> 
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default CollectedDatasets;