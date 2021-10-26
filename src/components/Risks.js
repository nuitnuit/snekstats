import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../App.css";

function Risks() {
  return (
    <div className="Risks">
      <Container padding="10px">
      <Row>
      <Col>
        <h1>Risks</h1>
        <img
          class="card-img-top"
          src="https://media.istockphoto.com/photos/fat-or-obese-man-chest-body-with-heart-and-red-ekg-heartbeat-curve-picture-id1197645998?s=612x612"
          alt="Card image cap"
        ></img>
        <p>
          Chronic diseases that can cause death(i.e. cardiovascular disease,
          stroke) Diabetes and its associated conditions(blindness, limb
          amputations,kidney failure) Musculoskeletal disorders(i.e.
          osteoarthritis) Risk of cancers(endometrial, breast, ovarian,
          prostate, liver, gallbladder, kidney and colon) Childhood obesity that
          continues into adulthood
        </p>
        </Col>
        </Row>      
      </Container>
    </div>
  );
}

export default Risks;
