import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import WHOLogo from "../assets/WHOLogo.png";
import CDCLogo from "../assets/CDCLogo.png";
import WikipediaLogo from "../assets/WikipediaLogo.png";
import "../App.css";
import { Row, Col } from "react-bootstrap";

function ExternalInfo() {
  return (
    <div className="ExternalInfo">
      <Container  style = {{minHeight:"100vh", padding:"10px"}}>
        <h1>More Info</h1>
        <h4>
          You may Click the following links to view more about the subject{" "}
        </h4>
        <Row>
          <Col>
            <Card>
              <Card.Header>World Health Organization</Card.Header>
              <Card.Img variant="top" src={WHOLogo} />
              <Card.Text className="m-3">
                Overweight and obesity are defined as abnormal or excessive fat
                accumulation that presents a risk to health. A body mass index
                (BMI) over 25 is considered overweight, and over 30 is obese.
                The issue has grown to epidemic proportions, with over 4 million
                people dying each year as a result of being overweight or obese
                in 2017 according to the global burden of disease.
              </Card.Text>
              <Button
                variant="primary"
                href="https://www.who.int/health-topics/obesity"
              >
                WHO
              </Button>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>
                Centers for Disease Control and Prevention
              </Card.Header>
              <Card.Img variant="top" src={CDCLogo} />
              <Card.Text className="m-3">
                Childhood obesity is a serious health problem in the United
                States. 1 in 5 children and adolescents in the US have obesity.
                Some groups of children are more affected than others, but all
                children are at risk of gaining weight that is higher than what
                is considered healthy.
              </Card.Text>
              <Button
                variant="primary"
                href="https://www.cdc.gov/obesity/index.html"
              >
                CDC
              </Button>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>Wikipedia</Card.Header>
              <Card.Img variant="top" src={WikipediaLogo} />
              <Card.Text className="m-3">
                Obesity is a medical condition in which excess body fat has
                accumulated to an extent that it may have a negative effect on
                health. People are generally considered obese when their body
                mass index (BMI), a measurement obtained by dividing a person's
                weight by the square of the person's height—despite known
                allometric inaccuracies is over 30 kg/m2; the range 25–30
                kg/m2 is defined as overweight.
              </Card.Text>
              <Button
                variant="primary"
                href="https://en.wikipedia.org/wiki/Obesity"
              >
                Wikipedia
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ExternalInfo;

/*

       
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="obesity">
            <div class="card">            
            <div class="card-body">
              <h5 class="card-title">Obesity</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/consequences-of-obesity-picture-id485112437?s=612x612" alt="Card image cap"></img>
             
                <p class="card-text">
               
                </p>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="cause">
            <div class="card">
            
            <div class="card-body">
              <h5 class="card-title">Causes</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/summer-bbq-food-table-scene-with-hot-dog-and-hamburger-buffet-top-picture-id1252794449?s=612x612" alt="Card image cap"></img>
                <p class="card-text">
                  The fundamental cause of obesity and overweight is an energy
                  imbalance between calories consumed and calories expended.
                  Globally, there has been: an increased intake of energy-dense
                  foods that are high in fat and sugars; and an increase in
                  physical inactivity due to the increasingly sedentary nature
                  of many forms of work, changing modes of transportation, and
                  increasing urbanization. Changes in dietary and physical
                  activity patterns are often the result of environmental and
                  societal changes associated with development and lack of
                  supportive policies in sectors such as health, agriculture,
                  transport, urban planning, environment, food processing,
                  distribution, marketing, and education.
                </p>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="risks">
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">Risks</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/fat-or-obese-man-chest-body-with-heart-and-red-ekg-heartbeat-curve-picture-id1197645998?s=612x612" alt="Card image cap"></img>
                <p class="card-text">
                <ol>
                        <li>Chronic diseases that can cause death(i.e. cardiovascular disease, stroke)</li>
                        <li>Diabetes and its associated conditions(blindness, limb amputations,kidney failure)</li>
                        <li>Musculoskeletal disorders(i.e. osteoarthritis)</li>
                        <li>Risk of cancers(endometrial, breast, ovarian, prostate, liver, gallbladder, kidney and colon) </li>
                        <li>Childhood obesity that continues into adulthood</li>
                  </ol>
                </p>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="prevention">
            <div class="card ">
            <div class="card-body">
              <h5 class="card-title">Prevention</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/mature-couple-staying-fit-and-healty-picture-id638538862?s=612x612" alt="Card image cap"></img>
                <p class="card-text">
                  Overweight and obesity, as well as their related
                  noncommunicable diseases, are largely preventable. Supportive
                  environments and communities are fundamental in shaping
                  people’s choices, by making the choice of healthier foods and
                  regular physical activity the easiest choice (the choice that
                  is the most accessible, available and affordable), and
                  therefore preventing overweight and obesity. At the individual
                  level, people can: limit energy intake from total fats and
                  sugars; increase consumption of fruit and vegetables, as well
                  as legumes, whole grains and nuts; and engage in regular
                  physical activity (60 minutes a day for children and 150
                  minutes spread through the week for adults). Individual
                  responsibility can only have its full effect where people have
                  access to a healthy lifestyle. Therefore, at the societal
                  level it is important to support individuals in following the
                  recommendations above, through sustained implementation of
                  evidence based and population based policies that make regular
                  physical activity and healthier dietary choices available,
                  affordable and easily accessible to everyone, particularly to
                  the poorest individuals. An example of such a policy is a tax
                  on sugar sweetened beverages.
                </p>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane" id="moreInfo">
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">More Info</h5>
              
                <p class="card-text">
                  You may Click the following links to view more about the subject
                </p>
                <a href="https://www.who.int/health-topics/obesity" class="btn btn-primary m-2">WHO</a>
                <a href="https://www.cdc.gov/obesity/index.html" class="btn btn-primary m-2">CDC</a>
                <a href="https://en.wikipedia.org/wiki/Obesity" class="btn btn-primary m-2">Wikipedia</a>


              </div>
            </div>
          </div>
        </div>

      */
