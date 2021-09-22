import React from "react"
import LiveTable from './LiveTable'
import Container from "react-bootstrap/Container";
import '../App.css';

class LiveDatasets extends React.Component {

    render() {
        return (
            <div className="LiveDatasets">
                <Container>
                    <div class="row align-items-center my-5">
                        <div class="col-md-12">
                            <LiveTable />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

}
export default LiveDatasets;