import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Obesity from './components/Obesity';
import Risks from './components/Risks';
import Prevention from './components/Prevention';
import ExternalInfo from './components/ExternalInfo';
import Topbar from './components/TopBar';
import Footerbar from './components/FooterBar';
import CollectedDatasets from './components/CollectedDatasets';
import LiveDatasets from './components/LiveDatasets';
import { SnackbarProvider } from 'notistack';

class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter basename={process.env.PUBLIC_URL}> 
        <SnackbarProvider maxSnack={3} >
          <Topbar />
          <div>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} exact />
              <Route path="/obesity" component={Obesity} exact />
              <Route path="/Risks" component={Risks} exact />
              <Route path="/ExternalInfo" component={ExternalInfo} exact />
              <Route path="/Prevention" component={Prevention} exact />
              <Route path="/collected-datasets" component={CollectedDatasets} exact />
              <Route path="/live-datasets" component={LiveDatasets} exact />
            </Switch>
          </div>
          <Footerbar />
        </SnackbarProvider>
      </BrowserRouter >
      </>
    );
  }
}
export default App;
