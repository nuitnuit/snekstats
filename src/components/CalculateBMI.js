import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../App.css";
import Container from "react-bootstrap/Container";
import { Col, Form, Row } from "react-bootstrap";

const Calculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [status, setStatus] = useState("");

  function calculateBMI() {
    try {
      let bmi = weight / height ** 2;
      if (isNaN(bmi)) {
        throw "NaN error thrown";
      }
      setBmiResult(bmi);
      setStatus(getStatus(bmi));
    } catch (error) {
      alert(error);
    }
  }

  function getStatus(bmi) {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  return (
    <Container>
    <Row>
      
      <Col sm={4}>
        <div className="BMICalculator">
          <Form>
          <h3>BMI Calculator</h3>
            <div>
              <label className="m-3">Height: </label>
              <input
                className="HeightInput"
                id="Height"
                type="text"
                placeholder="IN METERS"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="m-3">Weight:</label>
              <input
                className="WeightInput"
                id="Weight"
                type="text"
                placeholder="IN KG"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <button type="button" className="m-3" onClick={calculateBMI}>
              Calculate
            </button>
          </Form>
        </div>
      </Col>
      <Col>
        <div className="BMIResult">
          {bmiResult && (
          <Card className="mt-4">
            <Card.Title>BMI Result</Card.Title>
               <Card.Text>
              Your BMI is: {bmiResult}
              </Card.Text>
              <Card.Text>
              You are currently: {status}
              </Card.Text>              
            </Card>             
          )}
        </div>
      </Col>
    </Row>
    </Container>
  );
};

export default Calculator;
