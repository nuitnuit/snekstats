import React from "react"
import sneko from "../assets/sneko.png"

function Topbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <a class="navbar-brand" href="/"><img className="sneko" src={sneko} alt="logo" />SnekStats</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/obesity">Obesity</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Datasets
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="/collected-datasets">Collected Datasets</a>
                            <a class="dropdown-item" href="/live-datasets">Live Datasets</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/centers">Centers</a>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default Topbar