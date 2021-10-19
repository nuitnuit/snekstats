import React from 'react';
import Spinner from "react-bootstrap/Spinner";
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Col from "react-bootstrap/Col";
import { ResponsiveBar } from "@nivo/bar";
import FiltrationPanel from "./FiltrationPanel";

const columns = []

class LiveTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: this.props.isLoaded,
            items: [],
            agegroup: [],
            gender: [],
            renderItem: null,
            headers: null,
            currentAddr: this.props.fetchAddr,
            viewType: this.props.viewType,
            title: null,
        };
        this.loadDatasets = this.loadDatasets.bind(this);
    }

    handleSingleSliderChange = (event, newValue) => {
        this.setState({
            yearVal: newValue //single value
        });
        console.log(newValue);
    }
    handleDoubleSliderChange = (event, newValue, activeThumb) => {
        const minDistance = 1;
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                this.setState({
                    yearVal: [clamped, clamped + minDistance]
                });
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                this.setState({
                    yearVal: [clamped - minDistance, clamped]
                });
            }
        } else {
            this.setState({
                yearVal: newValue //array of 2 values [x, y]
            });
        }
    };
    filterSingleYear(data, yearVal) {
        const filteredData = data.filter(row => row.Year == yearVal);
        return filteredData;
    }
    filterDoubleYear(data, yearVal) {
        const filteredData = data.filter(row => row.Year >= yearVal[0] && row[0] <= yearVal[1]);
        return filteredData;
    }
    filterCountries(data, selectedCountries) {
        if (selectedCountries.length == 0)
            return data;
        //else
        const filteredData = data.filter(row => selectedCountries.includes(...row.Country))
        return filteredData;
    }
    filterGenders(data, selectedGenders) {
        if (selectedGenders.length == 0 || selectedGenders.length == 2)
            return data;
        //else
        const filteredData = data.filter(row => selectedGenders.includes(...row.Gender))
        return filteredData
    }

    loadDatasets() {
        if (this.props.fetchAddr !== null) {
            //console.log("live dataset changed " + this.props.fetchAddr);
            var country = [];
            var wbig = [];
            fetch("/api/DIMENSION/COUNTRY/DimensionValues")//get name for countries
                .then(res => res.json())
                .then(
                    (countries) => {
                        country = countries.value;
                    });
            fetch("/api/DIMENSION/WORLDBANKINCOMEGROUP/DimensionValues")//get name for world bank income group
                .then(res => res.json())
                .then(
                    (WBIG) => {
                        wbig = WBIG.value;
                    });
            fetch(this.props.fetchAddr)
                .then(res => res.json())
                .then(
                    (result) => {
                        var keys = [], yearList = [], countryList = [], genderList = []; //keys here is countries
                        var filteredData = [], data = result.value;
                        for (let i = 0; i < data.length; i++) {
                            var row = data[i];
                            if (row.Dim1 === 'MLE') {
                                row.Dim1 = 'Male';
                            }
                            else if (row.Dim1 === 'FMLE') {
                                row.Dim1 = 'Female';
                            }
                            else {
                                row.Dim1 = 'Both';
                            }

                            for (let j = 0; j < country.length; j++) {
                                var countryRow = country[j]
                                if (row.SpatialDim === countryRow.Code) {
                                    row.SpatialDim = countryRow.Title;
                                }
                                else if (row.SpatialDim === countryRow.ParentCode) {
                                    row.SpatialDim = countryRow.ParentTitle;
                                }
                            }
                            for (let x = 0; x < wbig.length; x++) {
                                var wbigRow = wbig[x];
                                if (row.SpatialDim === wbigRow.Code) {
                                    row.SpatialDim = wbigRow.Title;
                                }
                            }
                            if (row.Dim2Type === "AGEGROUP") {
                                var age = (row.Dim2.split('YEARS').pop());
                                row.Dim2 = (age.split("-"));
                            }
                            filteredData.push(row)
                        }
                        this.setState({
                            isLoaded: true,
                            items: filteredData,
                        });
                        var xLegend, yLegend; //string title for the x and y axis
                        const legends = [
                            {
                                dataFrom: "keys", //must have the legend names named as keys
                                anchor: "bottom-right",
                                direction: "column",
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: "left-to-right",
                                itemOpacity: 0.85,
                                itemTextColor: "#ffffff",
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ];
                        //switch case for different data view (barchart,piechart,...)
                        switch (this.props.viewType) {
                            case 1:
                                this.setState({
                                    renderItem:
                                        <div style={{ width: "100%" }}>
                                            <DataGrid autoHeight getRowId={(r) => r.Id} columns={this.state.headers} rows={this.state.items} pageSize={20} id="Id" rowsPerPageOptions={[500]} />
                                        </div>
                                });
                                break;
                            case 2:
                                const axisBottom = {
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: xLegend,
                                    legendPosition: "middle",
                                    legendOffset: 32
                                };
                                const axisLeft = {
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: yLegend,
                                    legendPosition: "middle",
                                    legendOffset: -40
                                };
                                this.setState({
                                    renderItem:
                                        <div>
                                            <Col style={{ height: "500px" }}>
                                                {console.log(this.state.items)}
                                                <ResponsiveBar
                                                    data={this.state.items}
                                                    keys={['FMLE']}
                                                    indexBy="SpatialDim"
                                                    padding={0.3}
                                                    margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
                                                    axisBottom={axisBottom}
                                                    axisLeft={axisLeft}
                                                    legends={legends}
                                                />
                                            </Col>
                                            {/*<Col xs={2}>
                                                <FiltrationPanel
                                                    yearVal={yearList}
                                                    genderVal={genderList}
                                                    countryVal={countryList}
                                                    onYearValChange={this.handleSingleSliderChange}
                                                    singlePointSlider={true}
                                                />
                                            </Col>*/}
                                        </div>
                                });
                                break;
                            case 3:
                                this.setState({
                                    renderItem:
                                        <div style={{ width: "100%" }}>
                                            <p>do pie chart</p>
                                        </div>
                                });
                                break;
                            case 4:
                                this.setState({
                                    renderItem:
                                        <div style={{ width: "100%" }}>
                                            <p>do line graph</p>
                                        </div>
                                });
                                break;
                            case 5:
                                this.setState({
                                    renderItem:
                                        <div style={{ width: "100%" }}>
                                            <p>world</p>
                                        </div>
                                });
                                break;
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
            //switch case for title
            switch (this.props.dataSetNum) {
                case 1: { this.state.title = "Prevalence of obesity among adults, BMI &GreaterEqual ; 30 (age-standardized estimate) (%)" } break;
                case 2: { this.state.title = "Prevalence of obesity among adults, BMI &GreaterEqual ; 30 (crude estimate) (%)" } break;
                case 3: { this.state.title = "Prevalence of overweight among children and adolescents, BMI > +1 standard deviations above the median (crude estimate) (%)" } break;
                case 4: { this.state.title = "Prevalence of obesity among children and adolescents, BMI > +2 standard deviations above the median (crude estimate) (%)" } break;
                case 5: { this.state.title = "Prevalence of thinness among children and adolescents, BMI < -2 standard deviations below the median (crude estimate) (%)" } break;
            }
            switch (this.props.dataSetNum) {
                case 1:
                case 2:
                    this.state.headers = [{
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
                        headerName: 'NumericValue',
                        field: 'NumericValue',
                        width: 150
                    },];
                    break;
                case 3:
                case 4:
                case 5:
                    this.state.headers = [{
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
                    },];
                    break;
            }
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
        //console.log(this.props.fetchAddr)
        //console.log(this.state.currentAddr)
        if (this.state.currentAddr !== this.props.fetchAddr || this.state.viewType !== this.props.viewType) {
            this.setState({
                currentAddr: this.props.fetchAddr,
                viewType: this.props.viewType,
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
                    <p>{this.state.title}</p>
                    {this.state.renderItem}
                </div >
            );
        }
    }
}
export { LiveTable }