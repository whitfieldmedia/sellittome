import React from 'react';
import Home from './Home';
import Nav from './Nav';
import Offer from './Offer';
import { Switch, Route } from 'react-router-dom';
import './assets/scss/app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/get-offer" component={Offer} />
        </Switch>
      </div>
    )
  }
}

export default App;