
import React from "react"
import '../App.css';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../App.css';
import Card from '@mui/material/Card';
import '../css/card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@mui/material/Avatar';
function Obesity() {
    return (
        <div className="Obesity">
            <Container padding = "10px">
            <Row>
                <Col className = "card">  
                <Card variant="outlined"> 
                <p className="smallHeaderText">What is Obesity?</p>
                <p>According to the World Health Organization,
                Overweight and obesity are defined as abnormal or excessive fat accumulation that presents a risk to health.
                These conditions are determined by our BMI(Body Mass Index).</p>
                </Card>
                </Col>
                <Col className = "card">   
                <Card variant="outlined">
                <p className="smallHeaderText">What is BMI?</p>
                <p>BMI, which stands for body mass index, is a value calculated by dividing one's mass by the square of their height.
                   BMI values fall into fice main categories, which are underweight(less than 18.5), normal(18.5 to 24.9), overweight(25-29.9),
                   obese(30-34.9) and extreme obese(35 and above).
                </p>
                </Card>
                </Col>
                <Col className = "card">   
                <Card variant="outlined">
                <p className="smallHeaderText">Why Obesity?</p>
                <p>Rates of obesity has been increasing in the recent years. Previously, this condition was mainly prevalent in high 
                    income countries, but this condition now also applies to middle and low income countries except except sub-Saharan Africa and Asia.
                    We want to the public to be aware of this issue and take good diet to ensure they stay healthy.
                </p>
                </Card>
                </Col>
                <Col className = "card">   
                <Card variant="outlined">
                <p className="smallHeaderText">What are the risks?</p>
                <p><ol>
                        <li>Chronic diseases that can cause death(i.e. cardiovascular disease, stroke)</li>
                        <li>Diabetes and its associated conditions(blindness, limb amputations,kidney failure)</li>
                        <li>Musculoskeletal disorders(i.e. osteoarthritis)</li>
                        <li>Risk of cancers(endometrial, breast, ovarian, prostate, liver, gallbladder, kidney and colon) </li>
                        <li>Childhood obesity that continues into adulthood</li>
                  </ol>
                </p>
                </Card>
                </Col>
            </Row>    
            </Container>
            <p>{'\n'}</p>
        </div>
    );
}

export default Obesity;