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
import { ResponsiveLine } from '@nivo/line'

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
                                row.Dim1 = 'Both Sex';
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
                                var selectedYear = 1975;
                                var barData = this.state.items;
                                var selectedData = [];
                                for (let i = 0; i < barData.length; i++) {
                                    var row = barData[i];
                                    if (!selectedData.find(o => o.country === row.SpatialDim)) {
                                        selectedData.push({ country: row.SpatialDim, data: [] })
                                    }
                                    for (let j = 0; j < selectedData.length; j++) {
                                        var yearsRow = selectedData[j];
                                        if (yearsRow.country === row.SpatialDim) {
                                            if (row.TimeDim === selectedYear) {
                                                if (row.Dim1 === "Male") { //if Male, Female or Both Sex
                                                    selectedData[j].data.push({ Male: row.NumericValue })
                                                }
                                                if (row.Dim1 === "Female") {
                                                    selectedData[j].data.push({ Female: row.NumericValue })
                                                }
                                                if (row.Dim1 === "Both Sex") {
                                                    selectedData[j].data.push({ BothSex: row.NumericValue })
                                                }
                                            }
                                        }
                                    }
                                }
                                console.log(selectedData);
                                var flatArray = [];

                                for (var index = 0; index < selectedData.length; index++) {
                                    var flatObject = {};
                                    for (var prop in selectedData[index]) {
                                        var value = selectedData[index][prop];
                                        if (Array.isArray(value)) {
                                            for (var i = 0; i < value.length; i++) {
                                                for (var inProp in value[i]) {
                                                    flatObject[inProp] = value[i][inProp];
                                                }
                                            }
                                        } else {
                                            flatObject[prop] = value;
                                        }
                                    }
                                    console.log(flatObject);
                                    flatArray.push(flatObject);
                                }
                                console.log(flatArray);
                                this.setState({
                                    renderItem:
                                        <div>
                                            <Col style={{ height: "1500px" }}>
                                                <ResponsiveBar
                                                    data={flatArray}
                                                    keys={['Male', 'Female', 'BothSex']}
                                                    indexBy="country"
                                                    margin={{ top: 50, right: 130, bottom: 300, left: 60 }}
                                                    padding={0.3}
                                                    valueScale={{ type: 'linear' }}
                                                    indexScale={{ type: 'band', round: true }}
                                                    colors={{ scheme: 'nivo' }}
                                                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                                    axisTop={null}
                                                    axisRight={null}
                                                    axisBottom={{
                                                        tickSize: 5,
                                                        tickPadding: 5,
                                                        tickRotation: 90,
                                                        legend: 'Country',
                                                        legendPosition: 'left',
                                                        legendOffset: 100
                                                    }}
                                                    axisLeft={{
                                                        tickSize: 5,
                                                        tickPadding: 5,
                                                        tickRotation: 0,
                                                        legend: 'Value',
                                                        legendPosition: 'middle',
                                                        legendOffset: -40
                                                    }}
                                                    labelSkipWidth={12}
                                                    labelSkipHeight={12}
                                                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                                    legends={[
                                                        {
                                                            dataFrom: 'keys',
                                                            anchor: 'bottom-right',
                                                            direction: 'column',
                                                            justify: false,
                                                            translateX: 120,
                                                            translateY: 0,
                                                            itemsSpacing: 2,
                                                            itemWidth: 100,
                                                            itemHeight: 20,
                                                            itemDirection: 'left-to-right',
                                                            itemOpacity: 0.85,
                                                            symbolSize: 20,
                                                            effects: [
                                                                {
                                                                    on: 'hover',
                                                                    style: {
                                                                        itemOpacity: 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                    role="application"
                                                    ariaLabel="Nivo bar chart demo"
                                                    barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
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
                                var pieData = this.state.items;
                                var onceYears = [];
                                for (let i = 0; i < pieData.length; i++) {
                                    var row = pieData[i];
                                    if (!onceYears.find(o => o.id === row.SpatialDim)) {
                                        if (row.SpatialDim === "Malaysia" || row.SpatialDim === "Americas" || row.SpatialDim === "Ireland") {
                                            onceYears.push({ id: row.SpatialDim, data: [] })
                                        }
                                    }
                                    for (let j = 0; j < onceYears.length; j++) {
                                        var yearsRow = onceYears[j];
                                        if (yearsRow.id === row.SpatialDim) {
                                            if (row.Dim1 === "Male") { //if Male, Female or Both Sex
                                                onceYears[j].data.push({ x: row.TimeDim, y: row.NumericValue })
                                            }
                                        }
                                    }
                                }
                                this.setState({
                                    renderItem:
                                        <div>
                                            {console.log(onceYears)}
                                            <Col style={{ height: "3000px" }}>
                                                <ResponsiveLine
                                                    data={onceYears}
                                                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                                    xScale={{ type: 'point' }}
                                                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                                    yFormat=" >-.2f"
                                                    axisTop={null}
                                                    axisRight={null}
                                                    axisBottom={{
                                                        orient: 'bottom',
                                                        tickSize: 5,
                                                        tickPadding: 5,
                                                        tickRotation: 90,
                                                        legend: 'Year',
                                                        legendOffset: 45,
                                                        legendPosition: 'middle'
                                                    }}
                                                    axisLeft={{
                                                        orient: 'left',
                                                        tickSize: 5,
                                                        tickPadding: 5,
                                                        tickRotation: 0,
                                                        legend: 'Value',
                                                        legendOffset: -40,
                                                        legendPosition: 'middle'
                                                    }}
                                                    pointSize={10}
                                                    pointColor={{ theme: 'background' }}
                                                    pointBorderWidth={2}
                                                    pointBorderColor={{ from: 'serieColor' }}
                                                    pointLabelYOffset={-12}
                                                    useMesh={true}
                                                    legends={[
                                                        {
                                                            anchor: 'bottom-right',
                                                            direction: 'column',
                                                            justify: false,
                                                            translateX: 100,
                                                            translateY: 0,
                                                            itemsSpacing: 0,
                                                            itemDirection: 'left-to-right',
                                                            itemWidth: 80,
                                                            itemHeight: 20,
                                                            itemOpacity: 0.75,
                                                            symbolSize: 12,
                                                            symbolShape: 'circle',
                                                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                                            effects: [
                                                                {
                                                                    on: 'hover',
                                                                    style: {
                                                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                                                        itemOpacity: 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                />
                                            </Col>
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