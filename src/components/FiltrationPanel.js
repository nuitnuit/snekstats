
import React from "react"
import Slider from '@mui/material/Slider'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class FiltrationPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            yearList: this.props.yearList,
            genderVal: this.props.genderVal,
            countryVal: this.props.countryVal,
            onYearValChange: this.props.onYearValChange,
            checkBoxList: this.props.checkBoxList,
            onCheckBoxListChange: this.props.onCheckBoxListChange,
            renderItem: null,
        }
    }
    
        
    
    componentDidMount()
    {
        var sliderComponent;
        if (this.props.singlePointSlider === true)
        {
            sliderComponent = <Slider
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
        else
        {
            sliderComponent = <Slider
                size="small"
                defaultValue={[Math.max(...this.state.yearList) - 1, Math.max(...this.state.yearVal)]}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={this.props.onYearValChange}
                min={Math.min(...this.props.yearList)}
                max={Math.max(...this.props.yearList)}
            />
        }


        this.setState({
            renderItem: <>
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
            {/*list of checkboxes foes here somewhere*/}
                
            </>,
        });
    }
    render()
    {
        return <>
            {this.state.renderItem}
        </>
    }
}

export default FiltrationPanel;