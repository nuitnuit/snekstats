import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { Col, Row } from "react-bootstrap";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveChoropleth } from '@nivo/geo';
import featuresArray from '../data/world_countries.json';
import FiltrationPanel from "./FiltrationPanel";
import { ResponsiveSunburst } from '@nivo/sunburst';

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
        this.onCheckBoxListChange = this.onCheckBoxListChange.bind(this);
    }
    restructureData(data = undefined) {
        if (data == undefined)
            data = this.state.finalData;

        var restructuredData = [];
        switch (this.props.datasetNum) {
            case 1:
                switch (this.props.viewType) {
                    case 2:
                        /*
                       //combine the data in such a way
                       //current data:
                       [
                           {
                               Country: "USA",
                               Year: "1999",
                               Value: 9.9,
                               Gender: "Male"
                           }
                       ]
                       desired:
                       [
                           {
                               Country: "USA",
                               Year: "1999",
                               Male: 9.9,
                               Female: 8.8
                           }
                       ]
                       */
                        var selectedYear = 1975;
                        var barData = this.state.items;
                        var selectedData = [];
                        for (let i = 0; i < barData.length; i++) {
                            var row = barData[i];
                            if (!selectedData.find(o => o.country === row.SpatialDim && o.year === row.TimeDim)) {
                                selectedData.push({ country: row.SpatialDim, year: row.TimeDim, data: [] })
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
                            flatArray.push(flatObject);
                        }
                        console.log(flatArray);
                        break;
                }
                break;
            case 2:
                switch (this.props.viewType) {
                    case 2:
                        break;
                }
        }
        return restructuredData;
    }
    reloadVisuals() {
        var xLegend, yLegend;
        const legends = [
            {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 140,
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
        switch (this.props.datasetNum) //no case 1 because case 1 is only for datagrid
        {
            case 1:
                switch (this.props.viewType) {
                    case 1:
                        this.setState({
                            renderItem: <>
                                <div style={{ width: "100%" }}>
                                    <DataGrid
                                        autoHeight
                                        autoPageSize
                                        pageSize={20}
                                        rows={this.state.finalData}
                                        columns={this.state.finalHeaders}
                                    />
                                </div>
                            </>,
                        });
                        break;
                    case 2: //filter year, the country, then the gender
                        var filteredData = this.restructureData(this.state.finalData)
                        filteredData = this.filterSingleYear(filteredData, this.state.yearVal)
                        filteredData = this.filterCountries(filteredData, this.state.filteredHeaders.Country)
                        this.setState({
                            filteredData: filteredData,
                            visual: <ResponsiveBar
                                data={filteredData}
                                {...this.state.visualProps}
                            />
                        }, () => {
                            console.log(this.state.filteredData)
                        });
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
                break;
            case 2:
                switch (this.props.viewType) {
                    case 1:
                        this.setState({
                            renderItem: <>
                                <div style={{ width: "100%" }}>
                                    <DataGrid
                                        autoHeight
                                        autoPageSize
                                        pageSize={20}
                                        rows={this.state.finalData}
                                        columns={this.state.finalHeaders}
                                    />
                                </div>
                            </>,
                        });
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                }
                break;
        }
    }
    filterYear(data, timeDim) {
        const filteredData = data.filter(row => row.TimeDim == timeDim);
        return filteredData;
    }
    filterCountries(data, countryList) {
        /*
            countryList = ["Singapore", "Malaysia", ...]
        */
        const filteredData = data.filter(row => countryList.includes(row.SpatialDim));
        return filteredData;
    }
    filterMY(data) {
        const filteredData = data.filter(row => row.SpatialDim == "Malaysia");
        return filteredData;
    }
    filterSG(data) {
        const filteredData = data.filter(row => row.SpatialDim == "Singapore");
        return filteredData;
    }
    filterMale(data) {
        const filteredData = data.filter(row => row.Dim1 == "Male");
        return filteredData;
    }
    filterFemale(data) {
        const filteredData = data.filter(row => row.Dim1 == "Female");
        return filteredData;
    }
    filterBTSX(data) {
        const filteredData = data.filter(row => row.Dim1 == "Both");
        return filteredData;
    }
    onCheckBoxListChange(checkboxList) { //will receive the changed data, then converts to a an object with list of strings
        var newList = {};
        Object.entries(checkboxList).map(([key, value]) => {
            newList[key] = []
            Object.entries(value).map(([key2, value2]) => {
                Object.keys(value2).map((key3) => {
                    if (value2[key3])
                        newList[key].push(key3)
                })
            })
        })
        this.setState({
            filteredHeaders: newList
        }, () => {
            this.reloadVisuals();
        })
    }
    handleSingleSliderChange = (event, newValue) => {
        this.setState({
            yearVal: newValue //single value or [1975, 2016]
        }, () => {
            this.reloadVisuals()
        });
    };
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
                }, () => {
                    this.reloadVisuals()
                });
            }
            else {
                const clamped = Math.max(newValue[1], minDistance);
                this.setState({
                    yearVal: [clamped - minDistance, clamped]
                }, () => {
                    this.reloadVisuals()
                });
            }
        }
        else {
            this.setState({
                yearVal: newValue //array of 2 values [x, y]
            }, () => {
                this.reloadVisuals()
            });
        }
    };
    filterSingleYear(data, yearVal) {
        const filteredData = data.filter(row => row.Year === yearVal);
        return filteredData;
    }
    filterDoubleYear(data, yearVal) {
        const filteredData = data.filter(row => row.Year >= yearVal[0] && row[0] <= yearVal[1]);
        return filteredData;
    }
    filterCountries(data, selectedCountries) {
        if (selectedCountries.length === 0)
            return data;
        //else
        const filteredData = data.filter(row => selectedCountries.includes(row.Country));
        return filteredData;
    }
    filterGenders(data, selectedGenders) {
        if (selectedGenders.length === 0 || selectedGenders.length === 2)
            return data;
        //else
        const filteredData = data.filter(row => selectedGenders.includes(...row.Gender));
        return filteredData;
    }

    loadDatasets() {

        if (this.props.fetchAddr !== null) {
            //console.log("live dataset changed " + this.props.fetchAddr);
            var country = [], wbig = [], oriData = [];
            var lists = {};
            var yearList = [], genderList = [], countryList = [];
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
                    (originalData) => { oriData = originalData.value; });
            fetch(this.props.fetchAddr)
                .then(res => res.json())
                .then(
                    (result) => {
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
                            //make arrays for FiltrationPanel
                            if (!countryList.find(o => o === row.SpatialDim)) {
                                countryList.push(row.SpatialDim)
                            }
                            if (!genderList.find(o => o === row.Dim1)) {
                                genderList.push(row.Dim1)
                            }
                            if (!yearList.find(o => o === row.TimeDim)) {
                                yearList.push(row.TimeDim)
                            }
                        }
                        lists = {
                            yearList: yearList,
                            countryList: countryList,
                            genderList: genderList,
                        }
                        this.setState({
                            isLoaded: true,
                            items: filteredData,
                            oriData: result.value,
                        });
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
                            case 2://bar chart
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
                                    flatArray.push(flatObject);
                                }
                                var restructuredData = this.restructureData();
                                //this block generates the list of checkboxes for the data and viewtype
                                var checkBoxList = {};
                                //have to do manual way because not all headers should be inside the checkbox list
                                var k = 0;
                                checkBoxList.Country = lists.countryList.map((item, index) => {
                                    var obj = {};
                                    obj[item] = k < 10 ? true : false;
                                    return obj;
                                });
                                k = 0;
                                checkBoxList.Gender = lists.genderList.map((item, index) => {
                                    var obj = {};
                                    obj[item] = k < 10 ? true : false;
                                    return obj;
                                });
                                var headers = {
                                    Country: lists.countryList,
                                    Gender: lists.genderList
                                }
                                this.setState({
                                    yearVal: Math.max(...lists.yearList),
                                    filteredData: restructuredData,
                                    filteredHeaders: headers
                                });
                                this.setState({
                                    filteredData: this.state.filteredData
                                        .filter(row => row.Year == this.state.yearVal), //filter the data by the maximum year
                                });
                                console.log(flatArray);
                                this.setState({
                                    renderItem:
                                        <div>
                                            <Row style={{ height: "2600px" }}>
                                                <ResponsiveBar
                                                    data={flatArray}
                                                    keys={['Male', 'Female', 'BothSex']}
                                                    indexBy="country"
                                                    margin={{ top: 10, right: 130, bottom: 100, left: 300 }}
                                                    padding={0.3}
                                                    layout="horizontal"
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
                                                        legend: 'Value',
                                                        legendPosition: 'middle',
                                                        legendOffset: 70
                                                    }}
                                                    axisLeft={{
                                                        tickSize: 5,
                                                        tickPadding: 5,
                                                        tickRotation: 0,
                                                        legend: 'Country',
                                                        legendPosition: 'middle',
                                                        legendOffset: -200
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
                                            </Row>
                                            {console.log(lists)}
                                            <FiltrationPanel
                                                yearList={lists.yearList}
                                                genderVal={lists.genderList}
                                                countryVal={lists.countryList}
                                                checkBoxList={checkBoxList}
                                                onCheckBoxListChange={this.onCheckBoxListChange}
                                                onYearValChange={this.handleSingleSliderChange}
                                                singlePointSlider={true}
                                            />
                                        </div>
                                });
                                break;
                            case 3://sunburst
                                //basic json
                                const myData = {
                                    "title": "Prevalence of Obesity",
                                    "children": [
                                    ]
                                }
                                //array of colours for colour scheme
                                var colorArr = ["#90b2e8", "#0095f2", "#acfa9b", "#69c272", "#ffcc8a", "#fc96ff", "#d595fc", "#f26868"];
                                //construct dynamic json
                                for (var timeDim = 2010; timeDim < 2016; timeDim++) {
                                    var json = {
                                        "title": timeDim,
                                        "color": timeDim % 2 == 0 ? colorArr[0] : colorArr[1], //if even first color, odd second color
                                        "size": 200,
                                        "children":
                                            [
                                                {
                                                    "title": "MY",
                                                    "color": colorArr[2],
                                                    "size": 400,
                                                    "children":
                                                        [
                                                            {
                                                                "title": "Male",
                                                                "color": colorArr[4],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterMY(this.filterMale(this.filterYear(data, timeDim)))][0][0].NumericValue * 80// get numeric value here
                                                                        }
                                                                    ]
                                                            },
                                                            {
                                                                "title": "Female",
                                                                "color": colorArr[5],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterMY(this.filterFemale(this.filterYear(data, timeDim)))][0][0].NumericValue * 80 // get numeric value here
                                                                        }
                                                                    ]
                                                            },
                                                            {
                                                                "title": "Both",
                                                                "color": colorArr[6],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterMY(this.filterBTSX(this.filterYear(data, timeDim)))][0][0].NumericValue * 80 // get numeric value here
                                                                        }
                                                                    ]
                                                            }
                                                        ]
                                                },
                                                {
                                                    "title": "SG",
                                                    "color": colorArr[3],
                                                    "size": 400,
                                                    "children":
                                                        [
                                                            {
                                                                "title": "Male",
                                                                "color": colorArr[4],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterSG(this.filterMale(this.filterYear(data, timeDim)))][0][0].NumericValue * 100 // get numeric value here
                                                                        }
                                                                    ]
                                                            },
                                                            {
                                                                "title": "Female",
                                                                "color": colorArr[5],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterSG(this.filterFemale(this.filterYear(data, timeDim)))][0][0].NumericValue * 100 // get numeric value here
                                                                        }
                                                                    ]
                                                            },
                                                            {
                                                                "title": "Both",
                                                                "color": colorArr[6],
                                                                "size": 1000,
                                                                "children":
                                                                    [
                                                                        {
                                                                            "size": [this.filterSG(this.filterBTSX(this.filterYear(data, timeDim)))][0][0].NumericValue * 100// get numeric value here
                                                                        }
                                                                    ]
                                                            }
                                                        ]
                                                }
                                            ]
                                    };
                                    myData.children.push(json);
                                }

                                console.log(myData);

                                this.setState({
                                    renderItem:
                                        <div>
                                            <Col style={{ height: "500px" }}>
                                                <div style={{ width: "100%" }}>
                                                    <ResponsiveSunburst
                                                        hideRootNode
                                                        id="NumericValue"
                                                        value="NumericValue" //added
                                                        colorType="literal"
                                                        colors={{ scheme: 'nivo' }}
                                                        data={myData}
                                                        title={this.state.title}
                                                        height={300}
                                                        width={350}
                                                        cornerRadius={2}
                                                        //borderColor={{ theme: 'background' }}
                                                        childColor={{ from: 'color', modifiers: [['brighter', 0.1]] }}
                                                        enableArcLabels={true}
                                                        arcLabelsSkipAngle={10}
                                                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
                                                    />
                                                </div>
                                            </Col>
                                        </div>
                                });
                                break;
                            case 4:
                                var pieData = this.state.items;
                                var selectedGender = "Male";
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
                                            if (row.Dim1 === selectedGender) { //if Male, Female or Both Sex
                                                onceYears[j].data.push({ x: row.TimeDim, y: row.NumericValue })
                                            }
                                        }
                                    }
                                }
                                console.log(onceYears)
                                this.setState({
                                    renderItem:
                                        <div>
                                            <Col style={{ height: "3000px" }}>
                                                <ResponsiveLine
                                                    data={onceYears}
                                                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                                    xScale={{ type: 'point' }}
                                                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
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
                                var givenData = oriData;
                                var selectedGender = "MLE";
                                var selectedYear = 2016;
                                var mapData = [];
                                for (let i = 0; i < givenData.length; i++) {
                                    var row = givenData[i];
                                    if (!mapData.find(o => o.id === row.SpatialDim)) {
                                        if (row.Dim1 === selectedGender && row.TimeDim === selectedYear) { //if Male, Female or Both Sex and the year is same
                                            mapData.push({ 'id': row.SpatialDim, 'value': row.NumericValue })
                                        }
                                    }
                                }
                                console.log(mapData);
                                this.setState({
                                    renderItem:
                                        <div>
                                            <Row style={{ height: "700px" }}>
                                                <ResponsiveChoropleth
                                                    data={mapData}
                                                    features={featuresArray.features}
                                                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                    colors="nivo"
                                                    domain={[0.0, 30.0]}
                                                    unknownColor="#666666"
                                                    label="properties.name"
                                                    //valueFormat=".2s"
                                                    projectionTranslation={[0.5, 0.5]}
                                                    projectionRotation={[0, 0, 0]}
                                                    enableGraticule={true}
                                                    graticuleLineColor="#dddddd"
                                                    borderWidth={0.5}
                                                    borderColor="#152538"
                                                    legends={[
                                                        {
                                                            anchor: 'bottom-left',
                                                            direction: 'column',
                                                            justify: true,
                                                            translateX: 20,
                                                            translateY: -100,
                                                            itemsSpacing: 0,
                                                            itemWidth: 94,
                                                            itemHeight: 18,
                                                            itemDirection: 'left-to-right',
                                                            itemTextColor: '#444444',
                                                            itemOpacity: 0.85,
                                                            symbolSize: 18,
                                                            effects: [
                                                                {
                                                                    on: 'hover',
                                                                    style: {
                                                                        itemTextColor: '#000000',
                                                                        itemOpacity: 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                />
                                            </Row>
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