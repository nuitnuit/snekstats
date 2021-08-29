import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Centers from './components/Centers';
import Obesity from './components/Obesity';
import Topbar from './components/TopBar';
import Footerbar from './components/FooterBar';
import CollectedDatasets from './components/CollectedDatasets';
import LiveDatasets from './components/LiveDatasets';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Topbar />
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/centers" component={Centers} />
            <Route path="/obesity" component={Obesity} />
            <Route path="/collected-datasets" component={CollectedDatasets} />
            <Route path="/live-datasets" component={LiveDatasets} />
          </Switch>
        </div>
        <Footerbar />
      </BrowserRouter >
    );
  }

}
export default App;
