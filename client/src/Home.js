import React from 'react';
import { Link } from 'react-router-dom';
import mrCash from './assets/images/mr-cash-flying.png';
import mrCashTall from './assets/images/mrcashtall2.png';
import header from './assets/images/header-bubble.png';
import car from './assets/images/automobile.svg';
import offer from './assets/images/offer.svg';
import money from './assets/images/money-bag.svg';
import bigHeader from './assets/images/headerBig.png';
import bigBubble from './assets/images/big-bubble.png';
import headerMid from './assets/images/headerMid.png';
import videoThumbnail from './assets/images/video_thumbnail2.png';
import { connect } from 'react-redux';
import { clearForm } from './redux/Form';
import './assets/css/home.css';

class Home extends React.Component {
   constructor() {
      super()
      this.state = { isLoaded: false, error: false, showVideo: false }
   }
   componentDidMount() {
      window.scrollTo(0,0)
      this.props.clearForm();
   }
   showVideo = () => {
      this.setState({
         showVideo: true
      })
   }
   closeVideo = () => {
      this.setState({
         showVideo: false
      })
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
                     <div className="cta-container">
                        <Link to="/get-offer" className="home-cta">
                           Get your offer
                        </Link>
                        <div className="video-thumbnail-container" onClick={this.showVideo}>
                           <img src={videoThumbnail} className="video-thumbnail" alt="sellittome learn more video thumbnail"/>
                           <p className="learn-more-text"> 
                              Learn More 
                              <i id="play_circle2" className="far fa-play-circle"></i>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               {this.state.showVideo
                  ?
                  <div className="home-video-holder">
                     <p onClick={this.closeVideo} className="close-video"> X </p>
                     <iframe className="home-video" title="Sell It To Me" src="https://player.vimeo.com/video/372667462?autoplay=1" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                  : null}
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
                           We can come to your to pick up the vehicle or you can go to one of our vehicle drop-off locations. We take possession of the vehicle and you take possession of cash!
                        </p>
                     </div>
                  </div>
               </div>
               <div className="about-container">
                  <h3 className="home-header3"> Disclaimers </h3>
                  <p className="disclaimer">
                     All offers are subject to an in person vehicle inspection. Clear title must be provided at time of payment. If vehicle has a lean, lean must be satisfied upon the vehicle purchase. Owner is responsible for any remaining balance on the vehicle above the offer.
                  </p>
               </div>
            </div>
         </div>
      )
   }
}

export default connect(state => state, { clearForm })(Home);
