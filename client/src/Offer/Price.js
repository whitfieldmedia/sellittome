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
            noOffer: false
        }
    }
    componentDidMount() {
        if(this.props.form.vin.length === 17) {
            this.props.getVin(this.props.form.vin, this.props.form.miles)
            this.setState({
                usedVin: true
            })
        } else {
            this.props.getValue(this.props.form.uvc, this.props.form.miles)
        }
    }
    componentDidUpdate() {
        if(this.props.blackValue.used_vehicles.used_vehicle_list.length > 0) {
            this.getPrice();
        }
        if(this.props.form.basePrice > 0) {
            this.getRange()
        }
        if(this.props.form.lowPrice > 0 && this.props.form.highPrice > 0) {
            this.sendEmail();
        }
    }

    getPrice = () => {
        var props = this.props;
        var condition = props.form.condition;
        if(this.props.form.basePrice === 0) {
            if(this.state.usedVin) {
                this.props.blackValue.used_vehicles.used_vehicle_list.map(res => {
                    props.addYear(res.year);
                    props.addMake(res.make);
                    props.addModel(res.model);
                    props.addStyle(res.body);
                    props.addUvc(res.uvc);
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
                    return this.getRange();
                })
            } else {
                this.props.blackValue.used_vehicles.used_vehicle_list.map(res => {
                    var price = 0;
                    if(condition === 'clean') {
                        price = parseInt(res.adjusted_tradein_clean, 10)
                    } else if (condition === 'average') {
                        price = parseInt(res.adjusted_tradein_avg, 10)
                    } else {
                        price = parseInt(res.adjusted_tradein_rough, 10)
                    }
                    console.log(price)
                    if(this.props.form.basePrice !== price) {
                        this.props.addBasePrice(price);
                    }
                    return this.getRange()
                })
            }
        } 
    }

    getRange = () => {
        console.log("GET RANGE")
        if( ((this.props.form.lowPrice === 0 || this.props.form.highPrice === 0) && this.props.form.basePrice !== 0)) {
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
            if((low - 800) < 0 && !this.state.noOffer) {
                console.log('noOffer')
                this.setState({ noOffer: true })
            } else {
                console.log(high)
                console.log(low)
                this.props.addHighPrice(high);
                this.props.addLowPrice(low);
            }
        }
    }

    sendEmail = () => {
        console.log("SEND EMAIL")
        let form = this.props.form
        if(!form.sent) {
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
                this.props.emailSent(true);
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
