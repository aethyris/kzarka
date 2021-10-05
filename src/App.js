import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import ImperialCooking from './views/ImperialCooking/ImperialCooking';
import Marketplace from './views/Marketplace/Marketplace';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={ImperialCooking} />
          <Route exact path="/imperialcooking" component={ImperialCooking} />
          <Route exact oath="/marketplace" component={Marketplace} />
        </Switch>
      </div>
    );
  }
}

export default App;
