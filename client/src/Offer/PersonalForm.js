import React from 'react';
import { connect } from 'react-redux';
import { getValue , getVin } from '../redux/BlackValue';
import { addName, addEmail, addPhone, addIndex, emailSent, showError } from '../redux/Form';
import '../assets/css/personal.css';

class PersonalForm extends React.Component {
    componentDidUpdate(prevProps) {
        if(this.props.form.sent && ((this.props.form.name !== prevProps.form.name) || (this.props.form.email !== prevProps.form.email) || (this.props.form.phone !== prevProps.form.phone))) {
            this.props.emailSent(false);
        }
    }
    componentWillUnmount() {
        clearTimeout();
    }
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
        return this.props.addIndex(10)
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
                            placeholder="Your Name" />
                    </div>
                    <div className="input-holder">
                        <label className="personal-label" htmlFor="email"> *Email </label>
                        <input type="text"
                        className="input"
                        onChange={this.handleEmailChange}
                        name="email"
                        value={this.props.form.email}
                        placeholder="Your Email" />
                    </div>
                    <div className="input-holder">
                        <label className="personal-label" htmlFor="phone"> *Phone </label>
                        <input type="tel"
                            name="phone"
                            className="input"
                            onChange={this.handlePhoneChange}
                            value={this.props.form.phone}
                            placeholder="Your Phone #" />
                    </div>
                    <button value="submit" className="submit-button"> Submit </button>
                </form>
            </div>
        )
    }
}

export default connect(state => state, { addName, addEmail, addPhone, getValue, getVin, addIndex, emailSent, showError })(PersonalForm);