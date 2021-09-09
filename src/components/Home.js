import React from "react";
import Container from 'react-bootstrap/Container'
function Home() {
    return (
        <div className="home">
            <Container>
                <br />
                <div class="d-flex justify-content-center">
                    <h1>Welcome To SnekStats</h1>
                </div>
                <div class="row align-items-center my-5">
                    <br />
                    <div class="col-lg-7">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src="https://themedicalbiochemistrypage.org/wp-content/uploads/2020/05/obesity-title-image.jpg"
                            alt="Obesity pic" width="600" height="400"
                        />
                    </div>
                    <div class="col-lg-5">
                        <p align="justify">
                            Snekstats is a data visualisation page that shows meaningful information aboubt your country's obesity rate. 
                            The page has several datasets sources for you to choose from, each of them providing a different type of filtration and analysis. 
                            You can also view the raw data in table format and interact with it. <br/><br/>
                            Our goal is to provide a better understanding of the obesity rate in your country. <br/><br/>
                            We hope you enjoy our website&#33;
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;