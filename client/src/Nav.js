import React from 'react';
import { Link } from 'react-router-dom';
import './assets/scss/nav.scss';

class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    render() {
        return (
            <div className="nav-bar-container">
                <div className="nav-top-row">
                    <h1> SELL IT TO ME </h1>
                </div>
                <div className="navbar-container">
                    <ul className="navbar">
                        <li className="nav-link-holder">
                            <i class="fas fa-bars"></i>
                        </li>
                        <li className="nav-link-holder">
                            <Link className="nav-link" to="/"> Home </Link>
                        </li>
                        <li className="nav-link-holder">
                            <Link className="nav-link" to="/get-offer"> Get Offer </Link>
                        </li>
                        <li className="nav-link-holder">
                            <Link className="nav-link" to="/enter-vin"> How it works </Link>
                        </li>
                        <li className="nav-link-holder">
                            <Link className="nav-link" to="/contact"> Contact Us </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Nav;