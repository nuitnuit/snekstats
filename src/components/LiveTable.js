import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const columns = [
    {
        field: "Id",
        headerName: 'ID',
        width: 150
    },
    {
        headerName: 'SpatialDim',
        field: 'SpatialDim',
        width: 150
    },
    {
        headerName: 'TimeDim',
        field: 'TimeDim',
        width: 150
    },
    {
        headerName: 'Dim1',
        field: 'Dim1',
        width: 150
    },
    {
        headerName: 'Dim2',
        field: 'Dim2',
        width: 150
    },
    {
        headerName: 'NumericValue',
        field: 'NumericValue',
        width: 150
    },
]

class LiveTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            fetchAddr: this.props.fetchAddr,
            filteredData: [],
        };
        this.loadDatasets = this.loadDatasets.bind(this);
    }

    loadDatasets() {
        if (this.props.fetchAddr !== null) {
            console.log("live dataset changed " + this.props.fetchAddr);
            var countries = require("i18n-iso-countries");
            fetch(this.props.fetchAddr)
                .then(res => res.json())
                .then(
                    (result) => {

                        var filteredData = [], data = result.value;
                        for (let i = 0; i < data.length; i++) {
                            var row = data[i];
                            if (row.Dim1 === 'MLE')
                            {
                                row.Dim1 = 'Male';
                            }
                            else if (row.Dim1 === 'FMLE')
                            {
                                row.Dim1 = 'Female';
                            }
                            filteredData.push(row)
                        }
                        this.setState({
                            isLoaded: true,
                            items: filteredData,
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
                
            //indicator code translation
            switch (this.props.dataSetNum) {
                case 1:
                case 2:
                    for (let i = this.state.items.length - 1; i >= 0; i--) {
                        if (this.state.items[i]["SpatialDimType"] === "COUNTRY") {

                        }
                        if (this.state.items[i]["TimeDimType"] === "YEAR") {

                        }
                        if (this.state.items[i]["Dim1Type"] === "SEX") {

                        }
                    }
                case 3:
                    console.log(("YEARS05-19").split("-")); //["05", 19]
                    for (let i = this.state.items.length - 1; i >= 0; i--) {
                        if (this.state.items[i]["SpatialDimType"] === "COUNTRY") {

                        }
                        if (this.state.items[i]["TimeDimType"] === "YEAR") {

                        }
                        if (this.state.items[i]["Dim1Type"] === "SEX") {

                        }
                        if (this.state.items[i]["Dim2Type"] === "AGEGROUP") {

                        }
                    }
                case 4:
                    for (let i = this.state.items.length - 1; i >= 0; i--) {
                        if (this.state.items[i]["SpatialDimType"] === "REGION") {

                        }
                        else if (this.state.items[i]["SpatialDimType"] === "COUNTRY") {

                        }
                        if (this.state.items[i]["TimeDimType"] === "YEAR") {

                        }
                        if (this.state.items[i]["Dim1Type"] === "SEX") {

                        }
                        if (this.state.items[i]["Dim2Type"] === "AGEGROUP") {

                        }
                    }
                case 5:
                    for (let i = this.state.items.length - 1; i >= 0; i--) {
                        if (this.state.items[i]["SpatialDimType"] === "WORLDBANKINCOMEGROUP") {

                        }
                        else if (this.state.items[i]["SpatialDimType"] === "REGION") {

                        }
                        else if (this.state.items[i]["SpatialDimType"] === "COUNTRY") {

                        }
                        if (this.state.items[i]["TimeDimType"] === "YEAR") {

                        }
                        if (this.state.items[i]["Dim1Type"] === "SEX") {

                        }
                        if (this.state.items[i]["Dim2Type"] === "AGEGROUP") {

                        }
                    }
            }
            //different view types
        }
        else {
            this.setState({
                isLoaded: true,
                renderItem: <p>No datasets selected</p>
            })
        }
    }
    componentDidMount() {
        this.loadDatasets();
    }

    componentDidUpdate() {
        console.log(this.props.fetchAddr)
        console.log(this.state.currentAddr)
        if (this.state.currentAddr !== this.props.fetchAddr) {
            this.setState({
                currentAddr: this.props.fetchAddr,
                isLoaded: false
            })
            this.loadDatasets();
        }
    }
    render() {
        const { error, isLoaded, items } = this.state;
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
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid autoHeight getRowId={(r) => r.Id} columns={columns} rows={this.state.items} pageSize={20} id="Id" rowsPerPageOptions={[500]} />
                </div >
            );
        }
    }
}
export { LiveTable }