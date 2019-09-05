import React from 'react';
import { connect } from 'react-redux';
import { getValue, getValueByVin } from '../redux/Year';
import { addName, addEmail, addPhone, addIndex, emailSent } from '../redux/Form';
import '../assets/scss/personal.scss';

class Form extends React.Component {
    handleNameChange = e => {
        this.props.addName(e.target.value)
    }
    handleEmailChange = e => {
        this.props.addEmail(e.target.value)
    }
    handlePhoneChange = e => {
        this.props.addPhone(e.target.value)
    }
    handleSubmit = () => {
        if(this.props.form.vin.length === 17) {
            this.props.getValueByVin(this.props.form.vin, this.props.form.miles)
        } else {
            this.props.getValue(this.props.form.vehicleId, this.props.form.miles)
        }
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    render() {
        return (
            <div className="form-page">
                <form className="personal-form" onSubmit={this.handleSubmit}>
                    <div className="input-holder">
                        <label className="personal-label" htmlFor="name"> *Name </label>
                        <input type="text" 
                            className="input"
                            onChange={this.handleNameChange}
                            name="name"
                            value={this.props.form.name}
                            placeholder="Enter Name" />
                    </div>
                    <div className="input-holder">
                        <label className="personal-label" htmlFor="email"> *Email </label>
                        <input type="text"
                        className="input"
                        onChange={this.handleEmailChange}
                        name="email"
                        value={this.props.form.email}
                        placeholder="Enter Email" />
                    </div>
                    <div className="input-holder">
                        <label className="personal-label" htmlFor="phone"> *Phone </label>
                        <input type="number"
                            name="phone"
                            className="input"
                            max-length="10"
                            onChange={this.handlePhoneChange}
                            value={this.props.form.phone}
                            placeholder="Enter Phone" />
                    </div>
                    <button onClick={this.handleFileNext} className="submit-button"> Submit </button>
                </form>
            </div>
        )
    }
}

export default connect(state => state, { addName, addEmail, addPhone, addIndex, emailSent, getValue, getValueByVin })(Form)