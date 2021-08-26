import logo from './logo.svg';
import sneko from './sneko.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Topbar(){
  return (
    <div className="Topbar">
    <img className ="sneko" src={sneko} alt="logo"/>
    <span className = "TopbarFont">SnekStats</span>
    <span className = "space"></span>
    <span className = "TopbarFont"><a className = "ref" href = "">Home</a></span>
    <span className = "smallspace"></span>
    <span className = "TopbarFont"><a className = "ref" href = "">About</a></span>
    <span className = "smallspace"></span>
    <span className = "TopbarFont"><a className = "ref" href = "">Obesity</a></span>
    <span className = "smallspace"></span>
    <span className = "TopbarFont"><a className = "ref" href = "">Datasets</a></span>
    <span className = "smallspace"></span>
    <span className = "TopbarFont"><a className = "ref" href = "">Centers</a></span>
    </div>
  );
}

function Footerbar(){
  return(
  <div className="Footerbar">
    <span className = "FooterbarFont"><a className = "ref" href = "">Home</a></span>
    <span className = "smallspace"></span>
    <span className = "FooterbarFont"><a className = "ref" href = "">About</a></span>
    <span className = "smallspace"></span>
    <span className = "FooterbarFont"><a className = "ref" href = "">Obesity</a></span>
    <span className = "smallspace"></span>
    <span className = "FooterFont"><a className = "ref" href = "">Datasets</a></span>
    <span className = "smallspace"></span>
    <span className = "FooterbarFont"><a className = "ref" href = "">Centers</a></span>
    <span className = "space2"></span>
    <span className = "FooterbarFont">Copyright 2021-2022 Snekstats. All right reserved.</span>
  </div>
    );
}


export {Topbar, Footerbar};
