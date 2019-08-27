import React from 'react';
import { Link } from 'react-router-dom';
import './assets/scss/home.scss';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="home-background"></div>
                <div className="home-background-overlay"></div>
                <div className="top-container">
                    <h1 className="home-header"> Selling a car? <br/> <strong>SELL IT TO ME!</strong> <br/> It's fast, easy, and legit! </h1>
                    <button className="home-button"> GET MY OFFER <i id="arrow" className="fas fa-arrow-circle-right"></i> </button>
                </div>
                <div className="how-container">
                    <h2 className="home-header2"> How it works. </h2>
                    <div className="how-row">
                        <div className="how-column">
                            <h2 className="how-steps"> 1 </h2>
                            <h3 className="home-header3"> Enter information about your car </h3>
                            <p className="home-par"> Give us the vin or year, make, model, and trim. Let us know the mileage and condition the cars in. Upload photos for a better offer. </p>
                        </div>
                    </div>
                    <div className="how-row">
                        <div className="how-column">
                            <h2 className="how-steps"> 2 </h2>
                            <h3 className="home-header3"> Get an instant offer </h3>
                            <p className="home-par"> We'll make you a estimated offer for your car right away! Obligation and hassle free! Within 24hrs we will send you an official offer for your car. </p>
                        </div>
                    </div>
                    <div className="how-row">
                        <div className="how-column">
                            <h2 className="how-steps"> 3 </h2>
                            <h3 className="home-header3"> Get Paid! </h3>
                            <p className="home-par"> When you accept the offer we can pick up the car or you can deliver it to us. Once everything checks out and we have your car you get paid! </p>
                        </div>
                    </div>
                </div>
                <div className="offer-container">
                    <Link to="/get-offer">
                        <h2 className="offer-header"> Get An Instant Offer! </h2>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;