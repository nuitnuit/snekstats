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
import loke from "../assets/loke.png"

function About() {
    return (
        <div className="About">
            <Container padding = "10px">
                <Row>
                    <p className="headerText">Team Sneko <img src={sneko2} alt="team-logo" /></p>
                    <p>We are a group of university students whose aim is to create health datasets which are accessible to the public. Our focus is obesity
                      and we will be providing both real-time datasets and historical datasets. We also make the datasets easy to understand
                      by visualizing the data using different graphs.</p>
                    <Col className="card">
                        <Card variant="outlined">
                            <h4><b>Lee Jun Lin</b></h4>
                            <Avatar className = "Avatar" alt = "lin" src={lin} sx = {{width: 80, height: 80}}/>
                            <p>"I love my cat"</p>
                            <p>Major : <ul>
                                            <li>Software Engineering</li>
                                            <li>Digital Systems Security</li>
                                     </ul>
                            </p>
                            <p>Roles: <ul>
                                            <li>Group leader</li>
                                            <li>Product manager</li>
                                            <li>Developer 1</li>
                                     </ul>
                            </p>
                        </Card>
                    </Col>
                    <Col className="card">
                        <Card variant="outlined">
                            <h4><b>Ryan Ooi Jia-Jiun</b></h4>
                            <Avatar className = "Avatar" alt = "ryan" src={ryan} sx = {{width: 80, height: 80}}/>
                            <p>"I love to cook"</p>
                            <p>Major : <ul>
                                            <li>Software Engineering</li>
                                            <li>Digital Systems Security</li>
                                     </ul>
                            </p>
                            <p>Roles: <ul>
                                            <li>UI/UX lead</li>
                                            <li>Scrum Master 2</li>
                                            <li>Developer 3</li>
                                     </ul>
                            </p>
                        </Card>
                    </Col>
                    <Col className="card">
                    <Card variant="outlined">
                        <div className="container">
                            <h4><b>Loke Yenyu</b></h4>
                            <Avatar className = "Avatar" alt = "loke" src={loke} sx = {{width: 80, height: 80}}/>
                            <p>"I love rabbits"</p>
                            <p>Major : <ul>
                                            <li>Software Engineering</li>
                                            <li>Digital Systems Security</li>
                                     </ul>
                            </p>
                            <p>Roles: <ul>
                                            <li>Project Coordinator</li>
                                            <li>Lead developer</li>
                                     </ul>
                            </p>
                        </div>
                    </Card>
                    </Col>
                    <Col className="card">
                    <Card variant="outlined">
                        <div className="container">
                            <h4><b>Kho Yi Ning</b></h4>
                            <Avatar className = "Avatar" alt = "lin" src={naomi} sx = {{width: 80, height: 80}}/>
                            <p>"I like art"</p>
                            <p>Major : <ul>
                                            <li>Software Engineering</li>
                                            <li>Game Development</li>
                                     </ul>
                            </p>
                            <p>Roles: <ul>
                                            <li>Scrum master</li>
                                            <li>Developer 2</li>
                                     </ul>
                            </p>
                        </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/*
                https://mui.com/components/cards/
                https://mui.com/components/avatars/
                https://mui.com/components/paper/
            */}
            <p>{'\n'}</p>
        </div>
    );
}

export default About;