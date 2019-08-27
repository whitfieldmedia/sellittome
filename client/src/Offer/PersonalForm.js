import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';

class PersonalForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            submitted: false
        }
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let state = this.state;
        const message = {
            name: state.name,
            from: state.email,
            phone: state.phone,
            year: this.props.year,
            make: this.props.make,
            model: this.props.model,
            series: this.props.series,
            style: this.props.style,
            vin: this.props.vin,
            uvc: this.props.uvc,
            files: this.props.files,
            miles: this.props.miles,
            lowPrice: this.props.lowPrice,
            highPrice: this.props.highPrice,
            zip: this.props.zip,
            condition: this.props.condition,
        }
        this.clearInputs();
        this.props.sendEmail(message);
    }
    clearInputs = () => {
        this.setState({
            name: '',
            email: '',
            phone: '',
            submitted: true
        })
    }
    render() {
        return (
            <div> 
                {this.state.submitted 
                ? <h1 className="personal-form-header"> Thank you for using Sell it to me! If you have any questions please feel free to reach out using the contact form! We will get back with you within 24 hours to give you an official offer on your vehicle. </h1>
                : 
                <div className="personal-form-holder">
                    <h1 className="personal-form-header"> Enter your contact information so we can send you an official offer. </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-holder">
                            <input type="text" 
                                className="input"
                                onChange={this.handleChange}
                                name="name"
                                value={this.state.name}
                                placeholder="Enter Name" />
                        </div>
                        <div className="input-holder">
                            <input type="text"
                            className="input"
                            onChange={this.handleChange}
                            name="email"
                            value={this.state.email}
                            placeholder="Enter Email" />
                        </div>
                        <div className="input-holder">
                            <input type="text"
                                name="phone"
                                className="input"
                                onChange={this.handleChange}
                                value={this.state.phone}
                                placeholder="Enter Phone" />
                        </div>
                        <button onClick={this.handleFileNext} className="next-button"> Submit </button>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default connect(state => state, { sendEmail })(PersonalForm);