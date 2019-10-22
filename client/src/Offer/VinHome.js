import React from 'react';
import { connect } from 'react-redux';
import { addVin, addIndex, addYear, showError, clearForm } from '../redux/Form';
import button from '../assets/images/offer-button.svg';
import { Redirect } from 'react-router-dom';

class VinHome extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: '',
            vinSelected: true,
            makeSelected: false,
            continue: false,
            yearError: false,
            vinError: false
        }
    }

    handleChange = (e) => { 
        this.props.addVin(e.target.value);
    }
    handleYearChange = (e) => {
        this.props.addYear(e.target.value);
    }

    handleSubmit = e => {
        e.preventDefault();
        var vin = this.props.form.vin
        if(vin.length === 17) {
            this.props.addIndex(5)
            this.setState({ continue: true })
        } else { 
            this.props.addIndex(2);
            this.props.showError(true);
            this.setState({ continue: true }) 
        }
    }
    handleYearNext = e => {
        e.preventDefault()
        var year = this.props.form.year
        if(year.length === 4) {
            this.props.addIndex(2);
            this.setState({ continue: true })
        } else {
            this.props.addIndex(1);
            this.props.showError(true);
            this.setState({ continue: true })
        }
    }
    handleVinClick = (e) => {
        e.preventDefault();
        this.setState({
            vinSelected: true,
            makeSelected: false
        })
    }
    handleMakeClick = (e) => {
        e.preventDefault()
        this.setState({
            vinSelected: false,
            makeSelected: true
        })
    }

    render() {
        return (
            this.state.continue 
            ? <Redirect to="/get-offer" />
            :
            <div className="home-input-container">
                <div className="select-box">
                    <div className={this.state.vinSelected ? "selected" : "select-holder"} onClick={this.handleVinClick} id="vin-select">
                        VIN
                    </div>
                    <div className={this.state.makeSelected ? "selected" : "select-holder"} onClick={this.handleMakeClick} id="make-select">
                        NO VIN?
                    </div>
                </div>
                {this.state.makeSelected 
                ? 
                <div className="home-input-holder">
                    <input type="number" maxLength="4" 
                        value={this.props.form.year} onChange={this.handleYearChange}
                        name="year" placeholder="Enter 4 digit year"
                        className="home-offer-input"
                    />
                    <button className="home-submit-button" onClick={this.handleYearNext}> 
                        <img src={button} className="get-offer-button" alt="get my offer" />
                    </button>
                </div>
                : 
                <div className="home-input-holder">
                    <input 
                        type="text" 
                        maxLength="17"
                        value={this.props.form.vin} 
                        onChange={this.handleChange}
                        name="vin" 
                        placeholder="Enter 17 Digit Vin"
                        className="home-offer-input" 
                    /> 
                    <button onClick={this.handleSubmit} className="home-submit-button"> 
                        <img src={button} className="get-offer-button" alt="get my offer" />
                    </button>
                </div>
                }
                {this.state.vinError 
                ? <p> Enter 17 Digit Vin </p>
                : null }
                {this.state.yearError 
                ? <p> Enter 4 Digit Number </p> 
                : null }
            </div>
        )
    }
}

export default connect(state => state, { addVin, addIndex, addYear, showError, clearForm })(VinHome)