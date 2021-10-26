
import React from "react"
import Slider from '@mui/material/Slider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup } from "@mui/material";
import Box from "@mui/material/Box"

class FiltrationPanel extends React.Component {
    constructor(props) {
        super(props);
        var checkBoxListState = {};
        Object.entries(this.props.checkBoxList).map(([key, _]) => {
            checkBoxListState[key] = [];
            Object.entries(_).map(([k, value]) => {
                Object.entries(value).map(([__, v]) => {
                    checkBoxListState[key].push(v)
                })
            })
        })
        Object.entries(checkBoxListState).map(([_, value]) => {
            value[0] = true; //initialize the first item to be checked
        })
        this.state = {
            yearList: this.props.yearList,
            onYearValChange: this.props.onYearValChange,
            onCheckBoxListChange: this.props.onCheckBoxListChange,
            checkBoxListState: checkBoxListState,
            renderItem: null,
            checked: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //check the state's checkboxList
    }

    handleParentCheckBoxchange(event, key) {
        var s = this.state.checkBoxListState;
        s[key].forEach((_, b) => {
            s[key][b] = event.target.checked
        })
        this.setState({
            checkBoxListState: s
        })
    }

    handleChildrenCheckBoxChange(event, key, k) {
        var s = this.state.checkBoxListState;
        s[key][k] = event.target.checked;
        this.setState({
            checkBoxListState: s
        })
    }

    render() {
        console.log(this.state.checkBoxListState)
        const checkboxes = Object.entries(this.state.checkBoxListState).map(([key, value]) => {
            console.log(key, value)
            return <>
                <FormControlLabel
                    label={key}
                    key={key}
                    control={
                        <Checkbox
                            checked={this.state.checkBoxListState[key].every((v) => v === true)}
                            indeterminate={this.state.checkBoxListState[key].some((v) => v === true) && (this.state.checkBoxListState[key].every((v) => v === true) === false)}
                            onChange={(event) => {
                                this.handleParentCheckBoxchange(event, key)
                            }}
                        />
                    }
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', ml: 4 }}>
                    {
                        Object.entries(value).map(([k, v]) => {
                            //to build the children of the key
                            //Country as key, Malaysia, Singapore, ... as children
                            console.log(k, v);
                            return (
                                <>
                                    <FormControlLabel
                                        label={Object.entries(this.props.checkBoxList[key][k]).map(([name, __]) => { return name })[0]}
                                        key={key, ":", k}
                                        control={
                                            <Checkbox
                                                checked={this.state.checkBoxListState[key][k]}
                                                onChange={(event) => {
                                                    this.handleChildrenCheckBoxChange(event, key, k)
                                                }}
                                            />
                                        }
                                    />
                                </>
                            );
                        })
                    }
                </Box>
            </>
        })
        var sliderComponent;
        if (this.props.singlePointSlider === true) {
            sliderComponent = <Slider
                //orientation="vertical"
                defaultValue={Math.max(...this.state.yearList)}
                step={1}
                marks
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={this.props.onYearValChange}
                min={Math.min(...this.props.yearList)}
                max={Math.max(...this.props.yearList)}
            />
        }
        else {
            sliderComponent = <Slider
                //orientation="vertical"
                size="small"
                defaultValue={[(Math.max(...this.state.yearList) - 1),
                Math.max(...this.state.yearVal)]}
                step={1}
                marks
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={this.props.onYearValChange}
                min={Math.min(...this.props.yearList)}
                max={Math.max(...this.props.yearList)}
            />
        }
        return <>
            <>
                <Row>
                    <Col>
                        <FormGroup>
                            {checkboxes}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}>
                        {Math.min(...this.props.yearList)}
                    </Col>
                    <Col>
                        {sliderComponent}
                        <h4>Year</h4>
                    </Col>
                    <Col xs={1}>
                        {Math.max(...this.props.yearList)}
                    </Col>
                </Row>
            </>
        </>
    }
}

export default FiltrationPanel;


/*
    {
        Country: [ //index is based on the checkBoxList.Country supplied at props
            true,
            false,
            true,
            ...
        ]
    }
    //sample values of the checkboxList
    {
        Gender: [
            {Male: true},
            {Female: false},
        ],
        Country: [
            {Malaysia: false},
            {Singapore: true},
            {Thailand: false},
            ...
        ]
    }
*/