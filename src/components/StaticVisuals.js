import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveBar } from "@nivo/bar";
import FiltrationPanel from "./FiltrationPanel";

export class StaticVisuals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: this.props.isLoaded,
            finalData: null,
            finalHeaders: null,
            error: null,
            renderItem: null,
            currentAddr: this.props.fetchAddr,
            viewType: this.props.viewType,
            filteredData: null,
            filteredHeaders: null,
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
                        let k = null;
                        for (let i = 0; i < this.state.finalData.length; i++) {
                            if (k === null) {
                                for (let j = i + 1; j < this.state.finalData.length; j++) {
                                    if (this.state.finalData[i].Year === this.state.finalData[j].Year && this.state.finalData[i].Country === this.state.finalData[j].Country) {
                                        restructuredData.push(
                                            {
                                                Year: this.state.finalData[i].Year,
                                                Country: this.state.finalData[i].Country,
                                                Male: this.state.finalData[i].Value,
                                                Female: this.state.finalData[j].Value
                                            }
                                        );
                                        k = j - i;
                                    }
                                }
                            }
                            else {
                                if (i + k === this.state.finalData.length) {
                                    break;
                                }
                                restructuredData.push(
                                    {
                                        Year: this.state.finalData[i].Year,
                                        Country: this.state.finalData[i].Country,
                                        Female: this.state.finalData[i].Value,
                                        Male: this.state.finalData[k + i].Value
                                    }
                                );
                            }
                        }
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
    onCheckBoxListChange(checkBoxList) { //will receive the changed data, then converts to a an object with list of strings
        var newList = {};
        Object.entries(checkBoxList).map(([key, value]) => {
            newList[key] = []
            Object.entries(value).map(([key2, value2]) => {
                Object.keys(value2).map((key3) => {
                    if (value2[key3])
                        newList[key].push(key3)
                })
            })
        })
        this.setState({
            filteredHeaders: newList,
            checkBoxList: checkBoxList
        }, () => {
            console.log(this.state.filteredHeaders);
            this.reloadVisuals();
        })
    }
    reloadVisuals() {
        console.log("reloadVisuals")
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
                        console.log(this.state.checkBoxList, this.state.filteredHeaders.Gender)
                        console.log(0, new Date())
                        filteredData = this.filterSingleYear(filteredData, this.state.yearVal)
                        filteredData = this.filterCountries(filteredData, this.state.filteredHeaders.Country)
                        this.setState({
                            filteredData: filteredData,
                            renderItem: <>
                                <Row>
                                    <Col style={{ height: "500px" }}>
                                        <ResponsiveBar
                                            data={filteredData}
                                            keys={this.state.filteredHeaders.Gender}
                                            {...this.state.visualProps}
                                        />
                                    </Col>
                                </Row>
                                <FiltrationPanel
                                    yearList={this.state.lists.yearList}
                                    genderVal={this.state.lists.genderList}
                                    countryVal={this.state.lists.countryList}
                                    checkBoxList={this.state.checkBoxList}
                                    onCheckBoxListChange={this.onCheckBoxListChange}
                                    onYearValChange={this.handleSingleSliderChange}
                                    singlePointSlider={true}
                                />
                            </>,
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
        const filteredData = data.filter(row => selectedCountries.includes(row.Country));
        return filteredData;
    }
    filterGenders(data, selectedGenders) {
        if (selectedGenders.length == 0 || selectedGenders.length == 2)
            return data;
        //else
        const filteredData = data.filter(row => selectedGenders.includes(...row.Gender));
        return filteredData;
    }
    loadDatasets() {
        if (this.props.fetchAddr !== null) {
            console.log("dataset changed");
            fetch(this.props.fetchAddr)
                .then(response => response.text())
                .then((data) => {
                    var dataList = [];
                    var headers, head, dataArray;
                    if (this.props.staticData !== null) //done dont touch anymore
                    {
                        dataArray = data.split("\n");
                        headers = dataArray[0];
                        head = headers.split(",");
                        var yearList = [], countryList = [], genderList = [], ageGroupList = [];
                        let i = 1, j = 0;
                        for (; i < dataArray.length; i++) {
                            j = 0;
                            var rowData = dataArray[i].split(",");
                            if (rowData !== [] && rowData[j] !== "" && rowData[j] !== undefined) {
                                var thing = { id: i, };
                                for (; j < head.length; j++) {
                                    thing[head[j].replace(/(\r\n|\n|\r)/gm, "")] = rowData[j].replace(/(\r\n|\n|\r)/gm, "");
                                }
                                dataList.push(thing);
                                if (yearList.includes(thing.Year) === false) {
                                    yearList.push(thing.Year);
                                }
                                if (countryList.includes(thing.Country) === false) {
                                    countryList.push(thing.Country);
                                }
                                if (genderList.includes(thing.Gender) === false) {
                                    genderList.push(thing.Gender);
                                }
                                if (thing.AgeGroup != undefined && thing.AgeGroup != null)
                                    if (ageGroupList.includes(thing.AgeGroup === false)) {
                                        ageGroupList.push(thing.AgeGroup);
                                    }
                            }
                        }
                        var lists = {
                            yearList: yearList,
                            countryList: countryList,
                            genderList: genderList,
                            ageGroupList: ageGroupList,
                        };
                        headers = [{ field: "id", headerName: "ID" }];
                        for (let i = 0; i < head.length; i++) {
                            headers.push(
                                {
                                    field: head[i].replace(/(\r\n|\n|\r)/gm, ""),
                                    headerName: head[i].replace(/(\r\n|\n|\r)/gm, ""),
                                    width: 200
                                }
                            );
                        }
                        this.setState((prevState) => ({
                            isLoaded: true,
                            finalData: dataList,
                            finalHeaders: headers,
                            lists: lists,
                        }));
                        this.loadVisuals();
                    }
                },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    });
        }
        else {
            this.setState({
                isLoaded: true,
                renderItem: <p>No datasets selected</p>
            });
        }
    }

    loadVisuals() {
        console.log("loadVisual")
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
        switch (this.props.datasetNum) {
            case 1: //no age group
                xLegend = "Country";
                yLegend = "Obesity prevalence";
                switch (this.props.viewType) {
                    case 1: //data grid
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
                    case 2: //bar chart, yearval is not an array
                        const axisBottom = {
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: xLegend,
                            legendPosition: "middle",
                            legendOffset: 32
                        };
                        const axisLeft = {
                            tickSize: 10,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: yLegend,
                            legendPosition: "middle",
                            legendOffset: -40
                        };

                        this.setState({
                            filteredData: this.state.finalData,
                        });
                        var restructuredData = this.restructureData();
                        //this block generates the list of checkboxes for the data and viewtype
                        var checkBoxList = {};
                        //have to do manual way because not all headers should be inside the checkbox list
                        var k = 0;
                        checkBoxList.Country = this.state.lists.countryList.map((item, index) => {
                            var obj = {};
                            obj[item] = k < 10 ? true : false;
                            return obj;
                        });
                        k = 0;
                        checkBoxList.Gender = this.state.lists.genderList.map((item, index) => {
                            var obj = {};
                            obj[item] = k < 10 ? true : false;
                            return obj;
                        });
                        var headers = {
                            Country: this.state.lists.countryList,
                            Gender: this.state.lists.genderList
                        }

                        this.setState({
                            yearVal: Math.max(...this.state.lists.yearList),
                            filteredData: restructuredData,
                            filteredHeaders: headers
                        });
                        this.setState({
                            filteredData: this.state.filteredData
                                .filter(row => row.Year == this.state.yearVal), //filter the data by the maximum year
                        });
                        var visProps = {
                            indexBy: "Country",
                            padding: 0.3,
                            margin: { top: 50, right: 130, bottom: 50, left: 70 },
                            axisBottom: axisBottom,
                            axisLeft: axisLeft,
                            legends: legends,
                            colors: { scheme: 'nivo' },
                        }
                        this.setState({
                            visualProps: visProps,
                            visual: <ResponsiveBar
                                data={this.state.filteredData}
                                keys={this.state.filteredHeaders.Gender}
                                {...visProps}
                            />
                        })
                        this.setState({
                            renderItem: <>
                                <Row>
                                    <Col style={{ height: "500px" }}>
                                        {this.state.visual}
                                    </Col>
                                </Row>
                                {console.log(checkBoxList)}
                                <FiltrationPanel
                                    yearList={this.state.lists.yearList}
                                    genderVal={this.state.lists.genderList}
                                    countryVal={this.state.lists.countryList}
                                    checkBoxList={checkBoxList}
                                    onCheckBoxListChange={this.onCheckBoxListChange}
                                    onYearValChange={this.handleSingleSliderChange}
                                    singlePointSlider={true}
                                />
                            </>,
                        });
                        break;
                }
                break;
            case 2:
                xLegend = "Country";
                yLegend = "Prevalence";
                switch (this.props.viewType) {
                    case 1: //data grid
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
                }
                break;
        }
    }

    componentDidMount() {
        this.loadDatasets();
    }

    componentDidUpdate() {
        if (this.state.currentAddr !== this.props.fetchAddr || this.state.viewType !== this.props.viewType) {
            this.setState({
                currentAddr: this.props.fetchAddr,
                isLoaded: false,
                viewType: this.props.viewType
            });
            this.loadDatasets();
        }
    }

    render() {
        console.log("render")
        const { error, isLoaded, renderItem, filteredData } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <>
                    <CircularProgress size={180} />
                    <p>Loading dataset</p>
                </>
            );
        } else {
            return (
                <>
                    {renderItem}
                </>
            );
        }
    }
}