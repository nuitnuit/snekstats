import React from "react"
import sneko from "../assets/sneko.png"

function Topbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/"><img className="sneko" src={sneko} alt="logo" />SnekStats</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/obesity">Obesity</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Datasets
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/collected-datasets">Collected Datasets</a>
                            <a className="dropdown-item" href="/live-datasets">Live Datasets</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/centers">Centers</a>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Topbar