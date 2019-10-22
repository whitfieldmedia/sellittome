import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../redux/email';
import { getValue, getVin } from '../redux/BlackValue';
import { emailSent, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addUvc, addBasePrice } from '../redux/Form';
import '../assets/css/price.css';

class Price extends React.Component {
    constructor() {
        super()
        this.state = {
            usedVin: false,
            finishedLoading: false,
            noOffer: false,
            basePrice: false
        }
    }
    componentDidMount() {
        if(this.props.form.vin.length === 17) {
            if(!this.state.usedVin) {
                this.setState({ usedVin: true })
            }
            this.props.getVin(this.props.form.vin, this.props.form.miles)
        } else {
            this.props.getValue(this.props.form.uvc, this.props.form.miles)
        }
    }
    componentDidUpdate() {
        if(this.props.blackValue.used_vehicles.used_vehicle_list.length > 0 && !this.state.basePrice) {
            this.getPrice();
        } else {
            if(this.props)
        }
    }

    getPrice = () => {
        var props = this.props;
        var condition = props.form.condition;
        this.props.blackValue.used_vehicles.used_vehicle_list.map(res => {
            if(res.year !== props.form.year || res.make !== props.form.make || res.model !== props.form.model) {
                props.addYear(res.model_year);
                props.addMake(res.make);
                props.addModel(res.model);
                props.addStyle(res.style);
                props.addUvc(res.uvc);
            }
            var price = 0;
            if(condition === 'clean') {
                price = parseInt(res.adjusted_tradein_clean, 10)
            } else if (condition === 'average') {
                price = parseInt(res.adjusted_tradein_avg, 10)
            } else {
                price = parseInt(res.adjusted_tradein_rough, 10)
            }
            if(this.props.form.basePrice !== price) {
                props.addBasePrice(price);
            }
            if(!this.state.basePrice) {
                this.setState({ basePrice: true })
            }
            return this.getRange();
        })
    }

    getRange = () => {
        if((this.props.form.lowPrice === 0 || this.props.form.highPrice === 0) && this.props.form.basePrice !== 0) {
            let files = this.props.form.files;
            var price = this.props.form.basePrice;
            var low = price;
            var high = price;
            if(files.length > 0) {
                low = (low * 0.8)
                high = (high * 0.9)
            } else {
                low = (low * .7)
                high = (high * .8)
            }
            if(low < 900 && !this.state.noOffer) {
                this.setState({ noOffer: true })
            } else {
                this.props.addHighPrice(high);
                this.props.addLowPrice(low);
            }
        }
        return this.sendEmail();
    }

    sendEmail = () => {
        let form = this.props.form
        if(!this.props.form.sent) {
        if(this.state.noOffer) {
            var message = {
                lowPrice: "NO",
                highPrice: "OFFER",
                name: form.name,
                from: form.email,
                phone: form.phone,
                year: form.year,
                make: form.make,
                model: form.model,
                style: form.style,
                uvc: form.uvc,
                vin: form.vin,
                zip: form.zip,
                condition: form.condition,
                files: form.files,
                miles: form.miles
            }
            this.props.sendEmail(message);
        } else {
            var message2 = {
                lowPrice: parseInt(form.lowPrice - 800),
                highPrice: parseInt(form.highPrice - 800),
                name: form.name,
                from: form.email,
                phone: form.phone,
                year: form.year,
                make: form.make,
                model: form.model,
                style: form.style,
                uvc: form.uvc,
                vin: form.vin,
                zip: form.zip,
                condition: form.condition,
                files: form.files,
                miles: form.miles
            }
            this.props.sendEmail(message2);
            this.props.emailSent(true);
        }
    } else {
        if(!this.state.finishedLoading) {
            this.setState({ finishedLoading: true })
        }
    }
    }
    render() {
        return (
            <div>      
                {this.state.finishedLoading 
                ? 
                <div className="pricing-page">
                    <div className="price-container">
                        <h2 className="price-vehicle"> {this.props.form.year} {this.props.form.make} {this.props.form.model} {this.props.form.style} </h2>
                        {this.state.noOffer 
                        ? <h2 className="price-range"> Unable to provide an instant offer. We will send an offer within 24hrs </h2> 
                        :
                        <h2 className="price-range"> ${parseInt(this.props.form.lowPrice - 800)} - ${parseInt(this.props.form.highPrice - 800)} </h2>
                        }
                        <p className="price-text"> 
                            Thank you for using Sell It To Me. We will send you an official offer within 24hrs. We have sent an email explaining further steps and giving you the chance to send us pictures if you haven't already.
                        </p>
                    </div>
                </div>
                : null}
            </div>
        )
    }
}

export default connect(state => state, { sendEmail, emailSent, getValue, getVin, addYear, addMake, addModel, addStyle, addLowPrice, addHighPrice, addUvc, addBasePrice })(Price)
