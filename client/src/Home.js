import React from 'react';
import { Link } from 'react-router-dom';
import mrCash from './assets/images/mr-cash-flying.png';
import mrCashTall from './assets/images/mrcashtall2.png';
import header from './assets/images/header-bubble.svg';
import button from './assets/images/get-offer-button.svg';
import car from './assets/images/automobile.svg';
import offer from './assets/images/offer.svg';
import money from './assets/images/money-bag.svg';
import Vin from './Offer/VinHome';
import bigHeader from './assets/images/headerBig.svg';
import bigBubble from './assets/images/big-bubble.svg';
import headerMid from './assets/images/headerMid.svg';
import './assets/css/home.css';

class Home extends React.Component {
   constructor() {
      super()
      this.state = { isLoaded: false, error: false }
   }
   render() {
      return (
         <div>
            <div className="top-container">
               <div className="top-holder">
                  <img src={bigBubble} className="big-bubble" alt="Get a fast easy hassle-free offer in minutes"/>
                  <div className="mid-size-holder">
                     <img src={headerMid} className="mid-header" alt="Selling a Car? Sell It To Me!" />
                     <img src={bigBubble} className="mid-bubble" alt="Get a fast easy hassle-free offer in minutes"/>
                  </div>
                  <img src={mrCash} className="mr-cash" alt="Mr. Cash"/>
                  <img src={mrCashTall} className="mr-cash-tall" alt="Mr. Cash"/>
                  <div className="top-column">
                     <img src={bigHeader} className="header-bubble-big" alt="Selling a Car? Sell It To Me!"/>
                     <img src={header} className="header-bubble" alt="Sell your car to me! Get a fast, easy, & hassle-free offer in minutes"/>
                     <Link to="/get-offer" id="cta-holder">
                        <img src={button} className="cta-button" alt="Get My Offer"/>
                     </Link>
                     <div className="input-column">
                        <Vin />
                     </div>
                  </div>
               </div>
            </div>
            <div className="how-container">
               <h2 className="home-header2"> How it works </h2>
               <div className="how-row">
                  <div className="how-column1">
                     <span className="road"></span>
                     <div className="line-column">
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                        <span className="line"></span><span className="line"></span>
                     </div>
                     <span className="road"></span>
                  </div>
                  <div className="how-column">
                     <div className="step-box">
                        <img src={car} className="car" alt="Car"/>
                        <h3 className="how-steps"> Enter information about your vehicle. </h3>
                        <p className="home-par">
                           Enter your vehicles vin or year, make, model, and trim and answer a few questions about your vehicle. 
                        </p>
                     </div>
                     <div className="step-box">
                        <img src={offer} className="offer" alt="Instant Offer"/>
                        <h3 className="how-steps"> Get an instant estimated offer. </h3>
                        <p className="home-par">
                           Receive an estimated offer based on what you submitted. You will receive a email with the official offer within 24 hours.
                        </p>
                     </div>
                     <div className="step-box">
                        <img src={money} className="money" alt="Get Paid!"/>
                        <h3 className="how-steps"> Get paid! </h3>
                        <p className="home-par">
                           We come to you to pick up the vehicle and if the inspection provided by us checks out you get paid on the spot!
                        </p>
                     </div>
                  </div>
               </div>
               <div className="about-container">
                  <h3 className="home-header3"> Disclaimers </h3>
                  <p className="disclaimer">
                     All offers are subject to an in person vehicle inspection provided by us. 
                     We need a signature from whoever has the vehicle title in their name or is the car is leased or has a loan we need the provider of the leaser or bank. 
                     If you owe more then we offer we will still buy your car you just need to pay difference on your loan or lease. 
                  </p>
               </div>
            </div>
         </div>
      )
   }
}

export default Home;
