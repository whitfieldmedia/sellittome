import React from 'react';
import { Link } from 'react-router-dom';
import './assets/css/nav.css';

class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    handleClick = e => {
        e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }
    closeNav = e => {
        e.preventDefault()
        this.setState({ isOpen: false })
    }
    render() {
        return (
            <div className="nav-bar-container">
                <Link to="/" className="nav-header"> SELL IT TO ME </Link>
                <div className="nav-bars-holder" onClick={this.handleClick}>
                    <i className="fas fa-bars" id="nav-bars"></i>
                </div>
                <ul className="navbar">
                    <li onClick={this.closeNav} className={this.state.isOpen ? "nav-link-holder nav-holder" : "nav-link-closed nav-holder"}>
                        <Link to="/" className="nav-link"> Home </Link>
                    </li>
                    <li onClick={this.closeNav} className={this.state.isOpen ? "nav-link-holder nav-holder" : "nav-link-closed nav-holder"}>
                        <Link className="nav-link" to="/get-offer"> Get Offer </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Nav;