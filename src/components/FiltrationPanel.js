
import React from "react"
import Slider from '@mui/material/Slider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
class FiltrationPanel extends React.Component {
    constructor(props) {
        super(props);
        var checkBoxListState = {};
        if (this.props.checkBoxList != null) {
            Object.entries(this.props.checkBoxList).map(([key, _]) => {
                checkBoxListState[key] = [];
                Object.entries(_).map(([k, value]) => {
                    Object.entries(value).map(([__, v]) => {
                        checkBoxListState[key].push(v)
                    })
                })
            })
        }
        this.state = {
            yearList: this.props.yearList,
            onYearValChange: this.props.onYearValChange,
            onCheckBoxListChange: this.props.onCheckBoxListChange,
            checkBoxListState: checkBoxListState,
            renderItem: null,
            checked: true
        }
    }

    handleUpdateFiltration() {
        var s = this.props.checkBoxList;
        Object.entries(this.state.checkBoxListState).map(([key, value]) => {
            Object.entries(value).map(([k, v]) => {
                Object.entries(s[key][k]).map(([kk, _]) => {
                    s[key][k][kk] = v
                })
            })
            /*
                from:
                [
                    true,
                    ...
                ]
                converts to:
                [
                    {"Malaysia": true},
                    ...
                ]
            */
        })
        this.props.onCheckBoxListChange(s)
    }

    handleParentCheckBoxchange(event, key) {
        var s = this.state.checkBoxListState;
        s[key].forEach((_, b) => {
            s[key][b] = event.target.checked
        })
        this.setState({
            checkBoxListState: s
        })
        this.handleUpdateFiltration();
    }

    handleChildrenCheckBoxChange(event, key, k) {
        var s = this.state.checkBoxListState;
        s[key][k] = event.target.checked;
        this.setState({
            checkBoxListState: s
        })
        this.handleUpdateFiltration();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.checkBoxList !== this.props.checkBoxList) {
            //empty function to prevent reupdate of checkboxlist when renderItem of static visual is updated
        }
    }

    render() {
        var checkboxes;
        if (this.state.checkboxListState === {}) {
            checkboxes = <></>
        }
        else {
            checkboxes = Object.entries(this.state.checkBoxListState).map(([key, value]) => {
                return <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
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
                        </AccordionSummary>
                        <AccordionDetails>
                            <Masonry>
                                {
                                    Object.entries(value).map(([k, v]) => {
                                        //to build the children of the key
                                        //Country as key, Malaysia, Singapore, ... as children
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
                            </Masonry>
                        </AccordionDetails>
                    </Accordion>
                </>
            })
        }
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
                <h4>Year</h4>
                <Row>
                    <Col xs={1}>
                        {Math.min(...this.props.yearList)}
                    </Col>
                    <Col>
                        {sliderComponent}
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
    //values after conversion
    {
        Country: [ //index is based on the checkBoxList.Country supplied at props
            true,
            false,
            true,
            ...
        ]
    }
*/