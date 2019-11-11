import React from 'react';
import { logout } from './redux/auth';
import { connect } from 'react-redux';
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
    logout = () => {
        this.props.logout();
    }
    render() {
        return (
            <div className="nav-bar-container">
                <Link to="/" className="nav-header"> SELLITTOME.COM </Link>
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
                    {this.props.auth.isAuthenticated
                    ?
                    <div>
                        <li onClick={this.logout} className={this.state.isOpen ? "nav-link-holder nav-holder" : "nav-link-closed nav-holder"}>
                            <p className="nav-link"> Log Out </p>
                        </li>
                        <li onClick={this.closeNav} className={this.state.isOpen ? "nav-link-holder nav-holder" : "nav-link-closed nav-holder"}>
                            <Link to="/vehicle-database" className="nav-link"> Database </Link>
                        </li>
                    </div>
                    : null}
                </ul>
            </div>
        )
    }
}

export default connect(state => state, { logout })(Nav);