import React from 'react';
import { connect } from 'react-redux';
import { addVin, addIndex } from '../redux/Form';
import { getBlackVin } from '../redux/BlackValue';
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
            this.props.addVin(vin);
            this.props.addIndex(5)
        } else {
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

export default connect(state => state, { addVin, addIndex, getBlackVin })(Vin)