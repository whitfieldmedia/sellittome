import React from 'react';
import { connect } from 'react-redux';
import { getBlackValue, getBlackVin } from '../redux/BlackValue';
import { addName, addEmail, addPhone, addIndex, emailSent } from '../redux/Form';
import '../assets/scss/personal.scss';

class PersonalForm extends React.Component {
    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if(this.props.form.sent) {
            if((this.prevProps.form.name !== this.props.form.name) || (this.prevProps.form.email !== this.props.form.email) ||(this.prevProps.form.phone !== this.props.form.phone)) {
                this.props.emailSent(false)
            }
        }
    }
    handleNameChange = e => {
        this.props.addName(e.target.value)
    }
    handleEmailChange = e => {
        this.props.addEmail(e.target.value)
    }
    handlePhoneChange = e => {
        this.props.addPhone(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleNext();
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

export default connect(state => state, { addName, addEmail, addPhone, getBlackValue, getBlackVin, addIndex, emailSent })(PersonalForm);