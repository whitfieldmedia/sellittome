import React from 'react';
import { connect } from 'react-redux';
import { addIndex, clearForm, showError } from '../redux/Form';
import Vin from './Vin';
import Year from './Year';
import Make from './Make';
import Model from './Model';
import Trim from './Trim';
import Miles from './Miles';
import Condition from './Condition';
import Zip from './Zip';
import UploadFiles from './UploadFiles';
import Price from './Price';
import PersonalForm from './PersonalForm';
import '../assets/scss/offer.scss';

class Offer extends React.Component {
    constructor() {
        super();
        this.state = {
            usedVin: false, 
        }
    }
    componentDidMount() {
        let props = this.props;
        let form = props.form;
        if(form.index === 0) {
            props.addIndex(0)
        } else if(form.name.length > 0 && form.email.length > 0 && form.phone.length === 10) {
            props.addIndex(10)
        } else if(form.files.length > 0) {
            props.addIndex(9)
        } else if (form.zip.length === 5) {
            props.addIndex(8)
        } else if (form.condition.length > 0) {
            props.addIndex(7)
        } else if (form.miles.length > 0) {
            props.addIndex(6)
        } else if (form.uvc.length > 0 || form.vin.length === 17) {
            props.addIndex(5)
        } else if (form.model.length > 0) {
            props.addIndex(4)
        } else if (form.make.length > 0) {
            props.addIndex(3)
        } else if(form.year.length === 4) {
            props.addIndex(2);
        } else if (form.year.length === 0) {
            props.addIndex(1)
        } else if (form.vin.length < 17) {
            props.addIndex(0)
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

    //Go back one form entry
    handlePrev = () => { 
        let index = (this.props.form.index - 1)
        return this.props.addIndex(index);
    }

    //form validation
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
            if(this.props.form.uvc.length > 0) {
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
            return ( <button onClick={this.handleNext} className="next-button"> next <i className="fas fa-arrow-right"></i>   </button> )
        } else if (this.props.form.index === 0) {
            return ( <button onClick={this.handleNext} className="next-button-long"> no vin? <i className="fas fa-arrow-right"></i> </button> )
        }
    }

    //show prev unless they are on the first page then give them option to enter vin
    showPrev = () => {
        if(this.props.form.index > 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> <i className="fas fa-arrow-left"></i> back </button> )
        } else if (this.props.form.index === 1) {
            return ( <button onClick={this.handlePrev} className="prev-button"> <i className="fas fa-arrow-left"></i> enter vin  </button> )
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
            return ( <h1 className="form-header"> Enter Cars Year </h1> )
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
            return ( <h2 className="form-header"> Your Estimated Offer </h2> )
        }
    }

    //Show input depending on what index(page) user is on
    formPart = () => {
        if(this.props.form.index === 0) {
            return ( <Vin handleError={this.handleError} /> )
        } else if(this.props.form.index === 1) {
            return ( <Year clearError={this.clearError} /> )
        } else if(this.props.form.index === 2) {
            return ( <Make handleNext={this.handleNext} handleError={this.handleError} /> )
        } else if(this.props.form.index === 3) {
            return ( <Model handleNext={this.handleNext} /> )
        } else if(this.props.form.index === 4) {
            return ( <Trim handleNext={this.handleNext} /> )
        } else if (this.props.form.index === 5) {
            return ( <Miles /> )
        } else if (this.props.form.index === 6) {
            return ( <Condition handleChange={this.handleChange} /> )
        } else if (this.props.form.index === 7) {
            return ( <Zip {...this.state.zip} handleChange={this.handleChange} /> )
        } else if (this.props.form.index === 8) {
            return ( <UploadFiles /> )
        } else if (this.props.form.index === 9) {
            return ( <PersonalForm handleNext={this.handleNext} /> )
        } else if (this.props.form.index === 10) {
            return ( <Price /> )
        }
    } 
    handleVinClick = () => {
        this.props.addIndex(0)
    }
    render() {
        console.log(this.props)
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
                    ? 
                        <div className="form-error-row" onClick={this.clearError}>
                            {this.formError()}
                            <p className="close-error"> X </p>
                        </div>
                    : null}
                    <div className="form-bottom-row">
                        {this.showPrev()}
                        <button className="reset-button" onClick={this.handleClear}> RESET </button>
                        {this.showNext()}
                    </div>
                </div>         
            </div>
        )
    }
}

export default connect(state => state, { addIndex, clearForm, showError })(Offer);