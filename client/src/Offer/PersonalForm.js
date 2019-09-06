import React from 'react';
import { connect } from 'react-redux';
import { getValue , getVin } from '../redux/BlackValue';
import { addName, addEmail, addPhone, addIndex, emailSent } from '../redux/Form';
import '../assets/css/personal.css';

class PersonalForm extends React.Component {
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
            this.props.getVin(this.props.form.vin, this.props.form.miles)
        } else {
            this.props.getValue(this.props.form.uvc, this.props.form.miles)
        }
        var index = this.props.form.index + 1;
        this.props.addIndex(index);
    }
    render() {
        return (
            <div> 
                <div className="personal-form-holder">
                    <h1 className="personal-form-header"> Enter your contact information so we can send you an official offer. </h1>
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
            </div>
        )
    }
}

export default connect(state => state, { addName, addEmail, addPhone, getValue, getVin, addIndex, emailSent })(PersonalForm);