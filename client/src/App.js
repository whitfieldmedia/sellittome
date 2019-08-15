import React from 'react';
import Home from './Home';
import Forms from './Forms/index';
import { Switch, Route } from 'react-router-dom';
import './assets/scss/app.scss';


class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header"> Get cash for your vehicle today! </h1>
        <div className="main-row">
          <div className="main-column" id="left-column">
            <h2 className="header2"> How it works </h2>
            <ol>
              <li> ENTER YOUR CARS INFORMATION </li>
              <li> GET A INSTANT ESTIMATED OFFER </li>
              <li> GET AN OFFICIAL OFFER WITHIN 24 HOURS </li>
              <li> CHOOSE PICK-UP OR DELIVERY </li>
              <li> GET CASH </li>
            </ol>
          </div>
          <div className="main-column" id="right-column">
            <h2 className="header"> GET A QUICK CASH OFFER! </h2>
            <Forms />
          </div>
        </div>
      </div>
    )
  }
}

export default App;