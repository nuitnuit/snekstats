import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";
import '../App.css';
import sneko2 from "../assets/sneko2.png";
import Card from '@mui/material/Card';
import '../css/card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@mui/material/Avatar';
import lin from "../assets/lin.png"
import ryan from "../assets/ryan.png"
import naomi from "../assets/naomi.jpg"

function About() {
    return (
        <div className="About">
            <Container>
                <Row>
                    <p className="headerText">Team Sneko <img src={sneko2} alt="team-logo" /></p>
                    <Col className="card">
                        <Card variant="outlined">
                            <h4><b>Lee Jun Lin</b></h4>
                            <Avatar alt = "lin" src={lin} sx = {{width: 80, height: 80}}/>
                            <p>"I love my cat"</p>
                            <p>Major : <ul>
                                            <li>Software Engineering</li>
                                            <li>Digital Systems Security</li>
                                     </ul>
                            </p>
                            <p>Roles: <ul>
                                            <li>Group leader</li>
                                            <li>Product manager</li>
                                            <li>Developer</li>
                                     </ul>
                            </p>
                        </Card>
                    </Col>
                    <Col className="card">
                        <Card variant="outlined">
                            <h4><b>Ryan Ooi Jia-Jiun</b></h4>
                            <Avatar alt = "ryan" src={ryan} sx = {{width: 80, height: 80}}/>
                            <p>"I love to cook"</p>
                            <p>Major : Software Engineering,{"\n"}Digital Systems Security</p>
                        </Card>
                    </Col>
                    <Col className="card">
                        <div className="container">
                            <h4><b>Loke Yenyu</b></h4>
                            <p>Architect Engineer</p>
                        </div>
                    </Col>
                    <Col className="card">
                        <div className="container">
                            <h4><b>Kho Yi Ning</b></h4>
                            <Avatar alt = "lin" src={naomi} sx = {{width: 80, height: 80}}/>
                            <p>Architect Engineer</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/*
                https://mui.com/components/cards/
                https://mui.com/components/avatars/
                https://mui.com/components/paper/
            */}
        </div>
    );
}

export default About;