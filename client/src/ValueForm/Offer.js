import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { emailSent, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addVehicleId, addBasePrice } from '../redux/Form';
import '../assets/scss/price.scss';

class Offer extends React.Component {
    constructor() {
        super();
        this.state = {
            usedVin: false,
            finishedLoading: false
        }
    }
    componentDidMount() {
        if(this.props.form.vin.length === 17 && !this.state.usedVin) {
            this.setState({ usedVin: true })
        }

        if(this.props.form.lowPrice > 0 && this.props.form.highPrice > 0) {
            this.sendEmail()
        } else if(this.props.form.basePrice > 0) {
            this.getRange()
        }
    }
    componentDidUpdate() {
        if(parseInt(this.props.years.result.map(res => res.adjustedcleantrade)) > 0) {
            this.getPrice()
        }
        if(this.props.form.basePrice > 0) {
            this.getRange()
        }
        if(this.props.form.lowPrice > 0 && this.props.form.highPrice > 0) {
            this.sendEmail();
        }
    }
    getPrice = () => {
        var condition = this.props.form.condition;
        var props = this.props;
        if(this.props.form.basePrice === 0) {
            if(this.state.usedVin) {
                this.props.years.result[0].map(res => {
                    props.addYear(res.modelyear);
                    props.addMake(res.make);
                    props.addModel(res.model);
                    props.addStyle(res.body);
                    props.addVehicleId(res.ucgvehicleid);
                    var price = 0;
                    if(condition === 'clean') {
                        price = parseInt(res.adjustedcleantrade, 10)
                    } else if (condition === 'average') {
                        price = parseInt(res.adjustedaveragetrade, 10)
                    } else {
                        price = parseInt(res.adjustedroughtrade, 10)
                    }
                    props.addBasePrice(price);
                    return this.getRange();
                })
            } else {
                this.props.years.result.map(res => {
                    var price = 0;
                    if(condition === 'clean') {
                        price = parseInt(res.adjustedcleantrade, 10)
                    } else if (condition === 'average') {
                        price = parseInt(res.adjustedaveragetrade, 10)
                    } else {
                        price = parseInt(res.adjustedroughtrade, 10)
                    }
                    this.props.addBasePrice(price);
                    return this.getRange()
                })
            }
        }
    }

    getRange = () => {
        if( ((this.props.form.lowPrice === 0 || this.props.form.highPrice === 0) && this.props.form.basePrice > 0)) {
            let fileLength = this.props.form.files.length;
            var price = this.props.form.basePrice;
            var low = price;
            var high = price;
            if(fileLength > 0) {
                low = (low * 0.8)
                high = (high * 0.9)
            } else {
                low = (low * .7)
                high = (high * .8)
            }
            this.props.addHighPrice(high);
            this.props.addLowPrice(low);
        }
    }

    sendEmail = () => {
        var form = this.props.form;
        if(!form.sent) {
            var message = {
                lowPrice: form.lowPrice,
                highPrice: form.highPrice,
                name: form.name,
                from: form.email,
                phone: form.phone,
                year: form.year,
                make: form.make,
                model: form.model,
                style: form.style,
                vehicleId: form.vehicleId,
                vin: form.vin,
                zip: form.zip,
                condition: form.condition,
                files: form.files,
                miles: form.miles
            }
            this.props.sendEmail(message);
            this.props.emailSent(true)
        } else {
            if(!this.state.finishedLoading) {
                this.setState({ finishedLoading: true })
            }
        }  
    }
    render() {
        console.log(this.props)
        return (
            <div>
                {this.state.finishedLoading 
                ?
                <div className="pricing-page">
                    <div className="price-container">
                        <h2 className="price-vehicle"> {this.props.form.year} {this.props.form.make} {this.props.form.model} {this.props.form.style} </h2>
                        <h2 className="price-range"> ${parseInt(this.props.form.lowPrice - 800)} - ${parseInt(this.props.form.highPrice - 800)} </h2>
                        <p className="price-text"> If you decide to continue we will send you a final offer within 24 hours. The price can go up or down from the range. If you accept the offer we will come to you and pick up the vehicle and you'll get paid!  </p>
                    </div>
                </div>
                : <h1> Getting Vehicles Values </h1> }
            </div>
        )
    }
}

export default connect(state => state, { sendEmail, emailSent, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addVehicleId, addBasePrice })(Offer);