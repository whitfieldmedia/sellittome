import React from 'react';
import EmailForm from './EmailForm';
import './assets/scss/app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="header"> Need $$$ quick? I'm Mr. Cash. </h1>
        <h2 className="header2"> I want to buy your stuff for CASH! It's never been easier to get cash for you unwanted stuff. I'll buy anything you have. </h2>
        <div className="main-row">
          <div className="main-column" id="left-column">
            <h2 className="header"> GET A QUICK CASH OFFER! </h2>
            <div className="button-container">
              <button className="main-button"> GET OFFER </button>
            </div>
          </div>
          <div className="main-column" id="right-column">
            <h2 className="header2"> How it works </h2>
            
          </div>
        </div>
        <EmailForm />
      </div>
    )
  }
}

export default App;