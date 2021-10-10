import React from "react";
import Card from "react-bootstrap/Card";
import "../App.css";

function Obesity() {
  return (
    <div className="Obesity">
      <h1>This is Obesity page</h1>
      <div class="card border border-primary">
        <div class="card-header card-header-tabs">
          <ul class="nav nav-tabs ">
            <li class="nav-item">
              <a
                class="nav-link active"
                href="#obesity"
                role="tab"
                data-toggle="tab"
              >
                About Obesity
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#cause" role="tab" data-toggle="tab">
                Causes of obesity
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#symptoms" role="tab" data-toggle="tab">
                Symptoms of Obesity
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#prevention"
                role="tab"
                data-toggle="tab"
              >
                Prevent Obesity
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#moreInfo" role="tab" data-toggle="tab">
                More Info
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content mt-3 p-2 ">
          <div role="tabpanel" class="tab-pane active" id="obesity">
            <div class="card">
            
            <div class="card-body">
              <h5 class="card-title">Obesity</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/consequences-of-obesity-picture-id485112437?s=612x612" alt="Card image cap"></img>
             
                <p class="card-text">
                  Overweight and obesity are defined as abnormal or excessive
                  fat accumulation that may impair health. Body mass index (BMI)
                  is a simple index of weight-for-height that is commonly used
                  to classify overweight and obesity in adults. It is defined as
                  a person's weight in kilograms divided by the square of his
                  height in meters (kg/m2)
                </p>
                <p class="card-text">
                  In 2019, an estimated 38.2 million children under the age of 5
                  years were overweight or obese. Once considered a high-income
                  country problem, overweight and obesity are now on the rise in
                  low- and middle-income countries, particularly in urban
                  settings. In Africa, the number of overweight children under 5
                  has increased by nearly 24% percent since 2000. Almost half of
                  the children under 5 who were overweight or obese in 2019
                  lived in Asia. Over 340 million children and adolescents aged
                  5-19 were overweight or obese in 2016. The prevalence of
                  overweight and obesity among children and adolescents aged
                  5-19 has risen dramatically from just 4% in 1975 to just over
                  18% in 2016. The rise has occurred similarly among both boys
                  and girls: in 2016 18% of girls and 19% of boys were
                  overweight. While just under 1% of children and adolescents
                  aged 5-19 were obese in 1975, more 124 million children and
                  adolescents (6% of girls and 8% of boys) were obese in 2016.
                  Overweight and obesity are linked to more deaths worldwide
                  than underweight. Globally there are more people who are obese
                  than underweight – this occurs in every region except parts of
                  sub-Saharan Africa and Asia.
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
          <div role="tabpanel" class="tab-pane" id="symptoms">
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">Symptoms</h5>
              <img class="card-img-top" src="https://media.istockphoto.com/photos/fat-or-obese-man-chest-body-with-heart-and-red-ekg-heartbeat-curve-picture-id1197645998?s=612x612" alt="Card image cap"></img>
                <p class="card-text">
                  Raised BMI is a major risk factor for noncommunicable diseases
                  such as: cardiovascular diseases (mainly heart disease and
                  stroke), which were the leading cause of death in 2012;
                  diabetes; musculoskeletal disorders (especially osteoarthritis
                  – a highly disabling degenerative disease of the joints); some
                  cancers (including endometrial, breast, ovarian, prostate,
                  liver, gallbladder, kidney, and colon). The risk for these
                  noncommunicable diseases increases, with increases in BMI.
                  Childhood obesity is associated with a higher chance of
                  obesity, premature death and disability in adulthood. But in
                  addition to increased future risks, obese children experience
                  breathing difficulties, increased risk of fractures,
                  hypertension, early markers of cardiovascular disease, insulin
                  resistance and psychological effects.
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
      </div>
    </div>
  );
}

export default Obesity;
