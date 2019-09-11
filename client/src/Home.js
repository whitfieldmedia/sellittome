import React from 'react';
import { Link } from 'react-router-dom';
import mrCash from './assets/images/mr-cash-flying.png';
import header from './assets/images/header-bubble3.svg';
import button from './assets/images/get-offer-button.svg';
import './assets/scss/home.scss';

class Home extends React.Component {
    constructor() {
        super()
        this.state = { isLoaded: false, error: false }
    }
    render() {
        return (
            <div className="home-container">
                <div className="top-container">
                    <img src={header} onLoad={this.handleImageLoad} onError={this.handleImageError} className="header-bubble" alt="Sell your car to Mr. Cash Fast, Easy, and hassle-free"/>
                    <img src={mrCash} className="mr-cash" alt="Mr. Cash"/>
                    <Link to="/get-offer">
                        <img src={button} className="cta-button" alt="Get my offer"/>
                    </Link>
                </div>
                <div className="how-container">
                    <div className="how-header-container">
                        <h2 className="home-header2"> How it works. </h2>
                    </div>
                    <div className="how-row">
                        <div className="how-column">
                            <div id="step1">
                                <h2 className="how-steps"> 1. Tell us about your car. </h2>
                            </div>
                            <p className="home-par"> Enter your vin or enter your car by make & answer a few questions about your car. </p>
                        </div>
                    </div>
                    <div className="how-row">
                        <div className="how-column">
                            <h2 className="how-steps"> 2. Get an estimated offer in minutes. </h2>
                            <p className="home-par"> We'll give you a estimated offer for your car right away! Obligation and hassle free! Within 24hrs we will send you an official offer for your car. </p>
                        </div>
                    </div>
                    <div className="how-row">
                        <div className="how-column">
                            <h2 className="how-steps"> 3. Get paid! </h2>
                            <p className="home-par"> 
                                When you accept the offer we come pick up the car and inspect it, if everything checks out you get paid instantly!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;