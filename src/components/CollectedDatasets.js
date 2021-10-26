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
import { StaticVisuals } from "./StaticVisuals";

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// usage example:
/*
    var a = ['a', 1, 'a', 2, '1'];
    var unique = a.filter(onlyUnique);

    console.log(unique); // ['a', 1, 2, '1']
*/


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

    render() {
        return (
            <div className="CollectedDatasets" >
                <Container>
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
                    <Row className="xl">
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
                            <StaticVisuals
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


/*
class DoubleSlider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
        };
    }
}
class SingleSlider extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: this.props.value,
            step: this.props.step,
            label: this.props.label,
            onValueChange: this.props.onChange,
        };
    }

    render()
    {
        return (

        );
    }
}
    <Bar
        width={600}
        height={400}
        margin={{ top: 60, right: 120, bottom: 60, left: 80 }}
        data={data} //the data in list of objects [{map: "US"}, {map: "China"}, {map: "India"}]
        keys={["wins", "loss"]} //legend headers
        indexBy="map" //the x axis of the data
        labelSkipWidth={12} //how many pixels wide available to draw the data label
        labelSkipHeight={12}
        axisBottom={axisBottom} //x axis
        axisLeft={axisLeft}
        legends={legends}
    />
{
    "country": "AD",
    "hot dog": 101,
    "hot dogColor": "hsl(353, 70%, 50%)",
    "burger": 165,
    "burgerColor": "hsl(55, 70%, 50%)",
    "sandwich": 169,
    "sandwichColor": "hsl(321, 70%, 50%)",
    "kebab": 53,
    "kebabColor": "hsl(211, 70%, 50%)",
    "fries": 134,
    "friesColor": "hsl(327, 70%, 50%)",
    "donut": 8,
    "donutColor": "hsl(294, 70%, 50%)"
}
a function or class to accept this, display out the checkboxes and lift up the checked values as a list
return value: a list of checked values
[
    key11,
    key12,
    key2
]
//key2 here means that everything under key2 is checked
//this could mean all age groups, all genders, all countries etc.
//key1 here could mean YEARS05-19, FEMALE, MYS etc..
example for checkbox and checkbox event handling
const [checked, setChecked] = React.useState([true, false]);

const handleChange1 = (event) => {
    console.log(event.target.checked);
    setChecked([event.target.checked, event.target.checked]);
};

const handleChange2 = (event) => {
    console.log(checked[0], checked[1])
    setChecked([event.target.checked, checked[1]]);
};

const handleChange3 = (event) => {
    console.log(checked[0], checked[1])
    setChecked([checked[0], event.target.checked]);
};
this.setState({
    renderItem:
    <>
        <Col>
            <ResponsiveBar data={this.state.finalData}/>
        </Col>
        <Col xs={1}>
            <FormControlLabel
                label="All"
                control={
                <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                />
                }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label="Child 1"
                control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
            />
            <FormControlLabel
                label="Child 2"
                control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
            />
            </Box>
        </Col>
    </>
});
    import React from "react";
    import { render } from "react-dom";
    import { Bar } from "@nivo/bar";

    const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
    };

    const data = [
    {
        map: "RoL",
        wins: 120,
        loss: 193
    },
    {
        map: "DS",
        wins: 35,
        loss: 160
    },
    {
        map: "TA",
        wins: 33,
        loss: 120
    },
    {
        map: "TTP",
        wins: 27,
        loss: 3
    },
    {
        map: "BRH",
        wins: 199,
        loss: 19
    },
    {
        map: "NA",
        wins: 117,
        loss: 107
    },
    {
        map: "AF",
        wins: 195,
        loss: 156
    },
    {
        map: "BEA",
        wins: 195,
        loss: 156
    },
    {
        map: "HP",
        wins: 195,
        loss: 156
    },
    {
        map: "M",
        wins: 195,
        loss: 156
    }
    ];

    const axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Map",
    legendPosition: "middle",
    legendOffset: 32
    };

    const axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Wins / Loss",
    legendPosition: "middle",
    legendOffset: -40
    };

    const theme = {
    background: "#222222",
    axis: {
        fontSize: "14px",
        tickColor: "#eee",
        ticks: {
        line: {
            stroke: "#555555"
        },
        text: {
            fill: "#ffffff"
        }
        },
        legend: {
        text: {
            fill: "#aaaaaa"
        }
        }
    },
    grid: {
        line: {
        stroke: "#555555"
        }
    }
    };

    const colorBy = ({ id }) => (id === "loss" ? "#d43c3c" : "#76d6b3");

    const legends = [
    {
        dataFrom: "keys",
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

    const App = () => (
    <div style={styles}>
        <Bar
        width={600}
        height={400}
        margin={{ top: 60, right: 120, bottom: 60, left: 80 }}
        data={data}
        keys={["wins", "loss"]}
        indexBy="map"
        labelSkipWidth={12}
        labelSkipHeight={12}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        legends={legends}
        />
    </div>
    );

    render(<App />, document.getElementById("root"));

 */