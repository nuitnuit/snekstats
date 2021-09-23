
import React from "react"
import Container from "react-bootstrap/Container";
import '../App.css';
import tableIcon from "../assets/table.png";
import graphIcon from "../assets/graph.png";
import piechartIcon from "../assets/piechart.png";
import  { StaticTable }  from './StaticTable';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

class CollectedDatasets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datasetHeader: "Dataset 1",
            datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv"
        };
    this.updateDataset = this.updateDataset.bind(this);
    }
    updateDataset(datasetNum)
    {
        this.setState(prevState => ({datasetHeader: "Dataset " + datasetNum}));
        switch(datasetNum)
        {
            case 1:
                this.setState({
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/compiled_countries_d1.csv"
                })
            case 2:
                this.setState({
                    datasetAddr: "https://snekosnekstats.000webhostapp.com/data/cleanedNCD_d2.csv"
                })
            case 3: 
                this.setState({
                    datasetAddr: ""
                })
        }
    }
    render() {
        return (
            <div className="CollectedDatasets">
                <Container>
                    <br />
                    <div className="d-flex justify-content-center">
                        <h1>Welcome To SnekStats</h1>
                    </div>
                    <h1>Chosen dataset</h1> 
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dataset-dropdown-header">
                        {this.state.datasetHeader}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.updateDataset(1)}>Dataset 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.updateDataset(2)}>Dataset 2</Dropdown.Item>
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
                    <StaticTable fetchAddr = {this.state.datasetAddr}/> 
                    {
                        console.log(this.state.datasetAddr)
                    }
                    
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
                    </div>*/}

                </Container>
            </div>
        );
    }
}

export default CollectedDatasets;