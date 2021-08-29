import React, { Component } from "react"
import FooterBar from "./FooterBar"
import TopBar from "./TopBar"
import Main from "./Main"
import Home from "./Home"

class SnekstatsContainer extends Component {

    render() {
        return (
            <div>
                <TopBar />
                <Home />
                <FooterBar />
            </div>
        )
    }
}
export default SnekstatsContainer