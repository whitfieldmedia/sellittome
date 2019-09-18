import React from 'react';
import { connect } from 'react-redux';
import { getValue , getVin } from '../redux/BlackValue';
import { addName, addEmail, addPhone, addIndex, emailSent, showError } from '../redux/Form';
import '../assets/css/personal.css';

class PersonalForm extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this);
    }
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
        console.log(e.target.value)
        var number = e.target.value.replace(/\D/,'')
        this.props.addPhone(number)
    }
    async handleSubmit() {
        let props = this.props;
        let form = this.props.form;
        if(form.name.length > 1 && form.phone.length === 10 && form.email.length > 3) {
            if(this.props.form.vin.length === 17) {
                try {
                    await props.getVin(form.vin, form.miles)
                    this.props.addIndex(this.props.form.index + 1)
                } catch (err) {
                    console.log(err)
                    this.props.showError(true)
                }
            } else {
                try {
                    await this.props.getValue(form.uvc, form.miles)
                    this.props.addIndex(this.props.form.index + 1)
                } catch (err) {
                    console.log("ERRORREOIR ", err);
                    this.props.showError(true)
                }
            }
        } else {
            this.props.showError(true)
        }
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
                    <button onClick={this.handleFileNext} className="submit-button"> Submit </button>
                </form>
            </div>
        )
    }
}

export default connect(state => state, { addName, addEmail, addPhone, getValue, getVin, addIndex, emailSent, showError })(PersonalForm);