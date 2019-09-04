import React from 'react';
import { connect } from 'react-redux';
import { addVin, addIndex, showError } from '../redux/Form';
import '../assets/scss/offer.scss';

class Vin extends React.Component {
    constructor() {
        super();
        this.state = {
            vin: ''
        }
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            vin: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        var vin = this.state.vin
        if(vin.length === 17) {
            this.props.showError(false)
            this.props.addVin(vin);
            this.props.addIndex(5);
        } else {
            this.props.showError(true)
            this.props.handleError()
        }
    }

    render() {
        return (
            <div className="vin-container">
                <input type="text" maxLength="17"
                    value={this.state.vin} onChange={this.handleChange}
                    name="vin" placeholder="17 digit Vin Number"
                    className="offer-input" /> 
                    <button onClick={this.handleSubmit} className="vin-submit-button"> Submit </button>
            </div>
        )
    }
}

export default connect(state => state, { addVin, addIndex, showError })(Vin)