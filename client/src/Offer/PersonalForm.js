import React from 'react';
import { connect } from 'react-redux';
import { getValue , getVin } from '../redux/BlackValue';
import { addName, addEmail, addPhone, addIndex, emailSent, showError } from '../redux/Form';
import '../assets/css/personal.css';

class PersonalForm extends React.Component {
    handleNameChange = e => {
        this.props.addName(e.target.value)
    }
    handleEmailChange = e => {
        this.props.addEmail(e.target.value)
    }
    handlePhoneChange = e => {
        var number = e.target.value.replace(/\D/,'')
        this.props.addPhone(number)
    }
    handleSubmit = () => {
        if(this.props.form.name.length > 1 && this.props.form.phone.length >= 10 && this.props.form.email.length > 5) {
            var index = this.props.form.index + 1;
            return this.props.addIndex(index);
        } else {
            this.props.showError(true)
        }
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
                            <input type="text"
                                name="phone"
                                className="input"
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

export default connect(state => state, { addName, addEmail, addPhone, getValue, getVin, addIndex, emailSent, showError })(PersonalForm);