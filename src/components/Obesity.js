import React from "react";
import Container from "react-bootstrap/Container";
import Calculator from "./CalculateBMI";
import "../App.css";
import { Row , Col} from "react-bootstrap";

function Obesity() {
  return (
    <div className="Obesity">
      <Container padding="10px">
      <Row>
      <Col>
        <h1>This is Obesity page</h1>
        <img
          class="card-img-top"
          src="https://media.istockphoto.com/photos/consequences-of-obesity-picture-id485112437?s=612x612"
          alt="Card image cap"
        ></img>
        <p>
          According to the World Health Organization, Overweight and obesity are
          defined as abnormal or excessive fat accumulation that presents a risk
          to health. These conditions are determined by our BMI(Body Mass
          Index).
        </p>

        <h2>Causes</h2>
        <p>
          The fundamental cause of obesity and overweight is an energy imbalance
          between calories consumed and calories expended. Globally, there has
          been: an increased intake of energy-dense foods that are high in fat
          and sugars; and an increase in physical inactivity due to the
          increasingly sedentary nature of many forms of work, changing modes of
          transportation, and increasing urbanization. Changes in dietary and
          physical activity patterns are often the result of environmental and
          societal changes associated with development and lack of supportive
          policies in sectors such as health, agriculture, transport, urban
          planning, environment, food processing, distribution, marketing, and
          education.
        </p>
        </Col>
        </Row>
        <Row>
        <Calculator />
        </Row>
      </Container>
    
    </div>
  );
}

export default Obesity;
