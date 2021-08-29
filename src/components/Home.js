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
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of
                            type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;