import React from 'react';
import { connect } from 'react-redux';
import { addIndex, clearForm, showError, emailSent } from '../redux/Form';
import Year from './Year';
import Makes from './Makes';
import Models from './Models';
import Bodies from './Bodies';
import Condition from './Condition';
import Files from './Files';
import Vin from './Vin';
import Miles from './Miles';
import Zip from './Zip';
import Offer from './Offer';
import Form from './Form';
import '../assets/scss/offer.scss';

class ValueForm extends React.Component {
    constructor() {
        super()
        this.state = {
            usedVin: false
        }
    }
    componentDidMount() {
        let props = this.props;
        let form = props.form;
        if(form.name.length > 0 && form.email.length > 0 && form.phone.length === 10) {
            props.addIndex(10)
        } else if(form.files.length > 0 || form.vin.length === 17) {
            props.addIndex(9)
        } else if (form.zip.length === 5) {
            props.addIndex(8)
        } else if (form.condition.length > 0) {
            props.addIndex(7)
        } else if (form.miles.length > 0) {
            props.addIndex(6)
        } else if (form.uvc.length > 0) {
            props.addIndex(5)
        } else if (form.model.length > 0) {
            props.addIndex(4)
        } else if (form.make.length > 0) {
            props.addIndex(3)
        } else if(form.year.length === 4) {
            props.addIndex(2);
        } else {
            props.addIndex(1)
        }
    }
    componentDidUpdate(prevProps) {
        var form = this.props.form;
        if(((prevProps.form.year !== form.year) || (prevProps.form.make !== form.make) ||(prevProps.form.model !== form.model) || (prevProps.form.vehicleId !== form.vehicleId) || (prevProps.form.email !== form.email) || (prevProps.form.name !== form.name)) && this.props.form.sent) {
            this.props.emailSent(false)
        }
    }
    handleError = () => {
        if(!this.props.form.error) {
            this.props.showError(true)
        }
    }
    clearError = () => { 
        if(this.props.form.error) {
            this.props.showError(false)
        }
    }
    handleClear = () => { 
        this.props.clearForm();
    }
    handlePrev = () => { 
        let index = (this.props.form.index - 1)
        return this.props.addIndex(index);
    }
    handleNext = (target) => {
        if(this.props.form.index === 0) { 
            this.next(); 
        } else if(this.props.form.index === 1) {
            if(this.props.form.year.length === 4) {
                this.next();
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 2) {
            if(this.props.form.make.length > 0) {
                this.next();
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 3) {
            if(this.props.form.model.length > 0) {
                this.next()
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 4) {
            if(this.props.form.vehicleId.length > 0 && this.props.form.style.length > 0) {
                this.next();
            } else {
                this.handleError();
            }
        }
        else if(this.props.form.index === 5) {
            if(this.props.form.miles.length > 0) {
                this.next();
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 6) {
            if(this.props.form.condition.length > 0) {
                this.next();
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 7) {
            if(this.props.form.zip.length === 5) {
                this.next();
            } else {
                this.handleError();
            }
        } else if(this.props.form.index === 8) {
            if(this.props.form.files.length > 0 || this.state.fileError) {
                this.setState({ fileError: false })
                this.next();
            } else {
                if(!this.state.fileError) {
                    this.handleError();
                    this.setState({ fileError: true })
                } 
            }
        } else if(this.props.form.index === 9) {
            if(this.props.form.name.length > 0 && this.props.form.email.length > 0 && this.props.form.phone.length > 0) {
                    this.next();
            } else {
                this.handleError();
            }
        }
    }
    //Moves user to next input
    next = () => { 
        let index = (this.props.form.index + 1)
        this.props.addIndex(index);
        if(this.props.form.error) {
            this.props.showError(false)
        }
    }

    //show next unless they are on the vin input page
    showNext = () => {
        if(this.props.form.index > 0) {
            return ( <button onClick={this.handleNext} className="next-button"> next </button> )
        } else if (this.props.form.index === 0) {
            return ( <button onClick={this.handleNext} className="next-button-long"> enter by make </button> )
        }
    }

    //show prev unless they are on the first page then give them option to enter vin
    showPrev = () => {
        if(this.props.form.index > 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> prev </button> )
        } else if (this.props.form.index === 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> enter vin  </button> )
        }
    }

    //If user selects next twice without any files uploaded they will continue onto pricing page
    noFiles = () => { 
        this.setState({ offerDone: true }) 
    }

    //Decide what error to throw 
    formError = () => {
        if(this.props.form.index === 0) {
            return ( <p className="error-text"> Enter Vin To Continue </p> )
        } else if(this.props.form.index === 1) {
            return ( <p className="error-text"> Enter Year to Continue </p> )
        } else if(this.props.form.index === 2) {
            return ( <p className="error-text"> Select a Make To Continue </p> )
        } else if (this.props.form.index === 3) {
            return ( <p className="error-text"> Select a Model To Continue </p> )
        } else if (this.props.form.index === 4) {
            return ( <p className="error-text"> Select a Trim To Continue </p> )
        } else if (this.props.form.index === 5) {
            return ( <p className="error-text"> Enter Mileage To Continue </p> )
        } else if (this.props.form.index === 6) {
            return ( <p className="error-text"> Select a Condition To Continue </p> )
        } else if (this.props.form.index === 7) {
            return ( <p className="error-text"> Enter A Zip Code To Continue </p> )
        } else if (this.props.form.index === 8) {
            return ( <p className="error-text"> Pictures help us give you a better offer. </p>  )
        } else if (this.props.form.index === 9) {
            return ( <p className="error-text"> Enter your contact info to see the offer. </p> )
        }
    }

    //Show header depending on what index(page) user is on
    headerSelector = () => {
        if(this.props.form.index === 0) {
            return ( <h1 className="form-header"> Enter Cars Vin </h1> )
        } else if(this.props.form.index === 1) {
            return ( <h1 className="form-header"> Select A Year </h1> )
        } else if(this.props.form.index === 2) {
            return ( <h1 className="form-header"> Select A Make </h1> )
        } else if(this.props.form.index === 3) {
            return ( <h1 className="form-header"> Select A Model </h1> )
        } else if(this.props.form.index === 4) {
            return ( <h1 className="form-header"> Select A Trim </h1> )
        } else if(this.props.form.index === 5) {
            return ( <h1 className="form-header"> Enter Cars Miles </h1> )
        } else if(this.props.form.index === 6) {
            return ( <h1 className="form-header"> Select Cars Condition </h1>)
        } else if(this.props.form.index === 7) {
            return ( <h1 className="form-header"> Enter Your Zip Code? </h1> )
        } else if(this.props.form.index === 8) {
            return ( <h1 className="form-header"> Upload Pictures </h1> )
        } else if (this.props.form.index === 9) {
            return ( <h1 className="form-header"> Enter Your Contact Info </h1> )
        } else if (this.props.form.index === 10) {
            return ( <h1 className="form-header"> Here's your offer! </h1> )
        }
    }

    //Show input depending on what index(page) user is on
    formPart = () => {
        if(this.props.form.index === 0) {
            return ( <Vin /> )
        } if(this.props.form.index === 1) {
            return ( <Year /> )
        } else if(this.props.form.index === 2) {
            return ( <Makes /> )
        } else if(this.props.form.index === 3) {
            return ( <Models /> )
        }  else if(this.props.form.index === 4) {
            return ( <Bodies /> )
        } else if (this.props.form.index === 5) {
            return ( <Miles /> )
        } else if (this.props.form.index === 6) {
            return ( <Condition handleChange={this.handleChange} /> )
        } else if (this.props.form.index === 7) {
            return ( <Zip {...this.state.zip} handleChange={this.handleChange} /> )
        } else if (this.props.form.index === 8) {
            return ( <Files /> )
        } 
        else if (this.props.form.index === 9) {
            return ( <Form handleNext={this.handleNext} /> )
        } else if (this.props.form.index === 10) {
            return ( <Offer /> )
        }
    } 
    render() {
        return (
            <div className="offer-page">
                <div className="form-container">
                    <div className="top-form-container">
                        {this.headerSelector()}
                    </div>
                    <div className="form">
                        {this.formPart()}
                    </div>
                    {this.props.form.error 
                    ? <div className="form-error-row" onClick={this.clearError}>
                        <p className="close-error"> X </p>
                        {this.formError()}
                    </div>
                    : null}
                    <div className="form-bottom-row">
                        {this.showPrev()}
                        <button className="reset-button" onClick={this.handleClear}> reset </button>
                        {this.showNext()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addIndex, clearForm, showError, emailSent })(ValueForm)